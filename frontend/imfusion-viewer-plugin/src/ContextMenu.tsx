import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useContextMenu, useImFusion } from '@imfusion/sdk-react';
import type { ImFusion, Menu } from '@imfusion/sdk';
import { runAsMenuAction } from './viewVisibility';

// Plain-JS copy of the SDK's Menu, so rendering never touches WASM handles.
type Entry =
  | { kind: 'action'; title: string; description: string; mark: 'check' | 'radio' | null; checked: boolean; run: () => void }
  | { kind: 'separator'; title: string; description: string }
  | { kind: 'submenu'; title: string; description: string; entries: Entry[] };

type Handle = { delete(): void; isDeleted?(): boolean };

const SUBMENU_DELAY_MS = 250;

// Our loadBuffer names: `<run>__<case>__<layer>__s<step>[__crop_<sig>].<ext>` and `combined__<case>__s<step>__<pairs>.nii`.
const COMBINED_FILE = /^combined__.+?__s(\d+)__.+$/;
const LAYER_FILE = /^(.+?)__.+?__(.+)__s(\d+)(__crop_[\w-]+?)?(\.[\w.]+)?$/;

function prettifyName(name: string): string | null {
  const combined = COMBINED_FILE.exec(name);
  if (combined) return `combined masks · step ${combined[1]}`;
  const m = LAYER_FILE.exec(name);
  if (!m) return null;
  return `${m[2]} · ${m[1]} · step ${m[3]}${m[4] ? ' (3D cross-section)' : ''}`;
}

function prettify(title: string): string {
  return prettifyName(title) ?? title.replace(/(['"])([^'"]+)\1/g, (s, q: string, name: string) => {
    const pretty = prettifyName(name);
    return pretty ? `${q}${pretty}${q}` : s;
  });
}

function snapshot(menu: Menu, handles: Handle[]): Entry[] {
  const entries: Entry[] = [];
  const items = menu.items();
  handles.push(items);
  for (let i = 0; i < items.size(); i++) {
    const item = items.get(i);
    if (!item) continue;
    handles.push(item);
    if (item.isSeparator()) {
      const sep = item.getSeparator();
      handles.push(sep);
      entries.push({ kind: 'separator', title: prettify(sep.title()), description: sep.description() });
    } else if (item.isSubmenu()) {
      const sub = item.getSubmenu();
      handles.push(sub);
      entries.push({ kind: 'submenu', title: prettify(sub.title()), description: sub.description(), entries: snapshot(sub, handles) });
    } else if (item.isAction()) {
      const action = item.getAction();
      handles.push(action);
      const type = action.type();
      entries.push({
        kind: 'action',
        title: prettify(action.title()),
        description: action.description(),
        mark: type === 'checkable' ? 'check' : type === 'radio' ? 'radio' : null,
        checked: action.isChecked(),
        run: () => action.activationCallback(),
      });
    }
  }
  return entries;
}

function freeHandles(handles: Handle[]): void {
  for (const h of [...handles].reverse()) {
    try {
      if (!h.isDeleted?.()) h.delete();
    } catch {
      // Already deleted.
    }
  }
}

/** Subscribes `onChange` to every visible-data / data-removal signal; returns the unsubscribers. */
function watchData(imf: ImFusion, onChange: () => void): (() => void)[] {
  const offs: (() => void)[] = [];
  const d = imf.display;
  const sources = [
    () => d.mainAxialView(),
    () => d.mainCoronalView(),
    () => d.mainSagittalView(),
    () => d.main3dView(),
    () => d.main2dView(),
    () => d.viewGroup(),
  ];
  for (const get of sources) {
    try {
      const src = get();
      if (typeof src?.onVisibleDataChanged === 'function') offs.push(src.onVisibleDataChanged(onChange));
    } catch {
      // View not present in this display.
    }
  }
  try {
    offs.push(imf.dataModel.onDataAboutToBeRemoved(onChange));
  } catch {
    // Not available.
  }
  return offs;
}

/** Swallows the pointerup/click that follow a swallowed dismiss pointerdown. */
function swallowRestOfClick(pointerId: number): void {
  const stop = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onUp = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return;
    stop(e);
    window.removeEventListener('pointerup', onUp, true);
    window.removeEventListener('pointercancel', onUp, true);
    setTimeout(done, 0); // click fires right after pointerup
  };
  const done = () => {
    window.removeEventListener('pointerup', onUp, true);
    window.removeEventListener('pointercancel', onUp, true);
    window.removeEventListener('click', stop, true);
    window.removeEventListener('auxclick', stop, true);
    window.removeEventListener('pointerdown', done, true);
  };
  window.addEventListener('pointerup', onUp, true);
  window.addEventListener('pointercancel', onUp, true);
  window.addEventListener('click', stop, true);
  window.addEventListener('auxclick', stop, true);
  // Pointerup may land outside the iframe; the next press resets.
  window.addEventListener('pointerdown', done, true);
}

const inMenu = (t: EventTarget | null) => !!(t as Element | null)?.closest?.('[data-imf-context-menu]');

// Close callbacks of every mounted ContextMenu.
const closers = new Set<() => void>();

/** Closes every open context menu; call before releasing Data that menu actions may reference. */
// eslint-disable-next-line react-refresh/only-export-components
export function closeContextMenus(): void {
  for (const close of [...closers]) close();
}

interface OpenMenu {
  id: number;
  x: number;
  y: number;
  entries: Entry[];
  handles: Handle[];
  offs: (() => void)[];
}

let nextMenuId = 0;

/** Renders the WebSDK's right-click menu. Must live inside `<ImFusionReady>`. */
export function ContextMenu() {
  const imf = useImFusion();
  const [open, setOpenState] = useState<OpenMenu | null>(null);
  // Mirrors `open` for listeners/cleanup, which must free the handles of whatever is open now.
  const openRef = useRef<OpenMenu | null>(null);
  // An action is running: its handles must outlive it, so close() waits for activate()'s finally.
  const activatingRef = useRef(false);

  const close = useCallback(() => {
    if (activatingRef.current) return;
    const current = openRef.current;
    if (!current) return;
    openRef.current = null;
    for (const off of current.offs) {
      try {
        off();
      } catch {
        // Already unsubscribed.
      }
    }
    freeHandles(current.handles);
    setOpenState(null);
  }, []);

  useContextMenu((menu, event) => {
    event.preventDefault();
    close();
    const handles: Handle[] = [menu];
    let entries: Entry[];
    try {
      entries = snapshot(menu, handles);
    } catch (err) {
      freeHandles(handles);
      throw err;
    }
    const { clientX, clientY } = event as MouseEvent;
    const next: OpenMenu = { id: ++nextMenuId, x: clientX, y: clientY, entries, handles, offs: [] };
    openRef.current = next;
    // Deferred: unsubscribing inside the signal emission is unsafe.
    next.offs = watchData(imf, () => queueMicrotask(() => openRef.current === next && close()));
    setOpenState(next);
  });

  useEffect(() => {
    closers.add(close);
    return () => {
      closers.delete(close);
      close();
    };
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (inMenu(e.target)) return;
      close();
      // Right-click (or macOS ctrl+click) must reach the SDK so it reopens the menu there.
      if (e.button === 2 || e.ctrlKey) return;
      e.preventDefault();
      e.stopPropagation();
      swallowRestOfClick(e.pointerId);
    };
    const onWheel = (e: WheelEvent) => !inMenu(e.target) && close();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('wheel', onWheel, { capture: true, passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('blur', close);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', close);
      window.removeEventListener('resize', close);
    };
  }, [open, close]);

  if (!open) return null;
  const activate = (run: () => void) => {
    activatingRef.current = true;
    try {
      runAsMenuAction(run);
      imf.render();
    } finally {
      activatingRef.current = false;
      close();
    }
  };
  return <MenuList key={open.id} entries={open.entries} x={open.x} y={open.y} autoFocus onActivate={activate} onClose={close} />;
}

interface MenuListProps {
  entries: Entry[];
  x: number;
  y: number;
  /** Parent item's left edge, for submenus: they flip there if they'd overflow right. */
  flipX?: number;
  autoFocus?: boolean;
  /** Index highlighted on mount (keyboard-opened submenus). */
  initialActive?: number | null;
  onActivate: (run: () => void) => void;
  onClose: () => void;
  /** Set for submenus: ArrowLeft/Escape hands focus back to the parent. */
  onExit?: () => void;
}

interface SubState {
  index: number;
  x: number;
  y: number;
  flipX: number;
  focus: boolean;
}

const isNavigable = (e: Entry) => e.kind !== 'separator';

function firstNavigable(entries: Entry[]): number | null {
  const i = entries.findIndex(isNavigable);
  return i < 0 ? null : i;
}

function MenuList({ entries, x, y, flipX, autoFocus, initialActive = null, onActivate, onClose, onExit }: MenuListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();
  const [pos, setPos] = useState({ left: x, top: y });
  const [active, setActive] = useState<number | null>(initialActive);
  const [openSub, setOpenSub] = useState<SubState | null>(null);

  // Keep the menu inside the viewport.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let left = x;
    if (left + r.width > window.innerWidth - 4) {
      left = flipX !== undefined ? flipX - r.width + 2 : window.innerWidth - r.width - 4;
    }
    setPos({
      left: Math.max(0, left),
      top: Math.max(0, Math.min(y, window.innerHeight - r.height - 4)),
    });
  }, [x, y, flipX]);

  useEffect(() => {
    if (autoFocus) ref.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const openSubAt = (i: number, focus: boolean) => {
    clearTimeout(timer.current);
    const row = rows.current[i];
    if (!row) return;
    const r = row.getBoundingClientRect();
    setActive(i);
    setOpenSub({ index: i, x: r.right - 2, y: r.top - 4, flipX: r.left, focus });
  };

  const closeSub = () => {
    clearTimeout(timer.current);
    const el = ref.current;
    // Focus was inside the submenu: take it back so keys keep working.
    if (el && document.activeElement !== el && el.contains(document.activeElement)) el.focus({ preventScroll: true });
    setOpenSub(null);
  };

  const later = (fn: () => void) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fn, SUBMENU_DELAY_MS);
  };

  const nav = entries.flatMap((e, i) => (isNavigable(e) ? [i] : []));

  const moveTo = (i: number | undefined) => {
    if (i === undefined) return;
    setActive(i);
    if (openSub && openSub.index !== i) closeSub();
    rows.current[i]?.scrollIntoView({ block: 'nearest' });
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    const cur = active === null ? -1 : nav.indexOf(active);
    const entry = active === null ? undefined : entries[active];
    switch (e.key) {
      case 'ArrowDown':
        moveTo(nav[(cur + 1) % nav.length]);
        break;
      case 'ArrowUp':
        moveTo(nav[cur <= 0 ? nav.length - 1 : cur - 1]);
        break;
      case 'Home':
        moveTo(nav[0]);
        break;
      case 'End':
        moveTo(nav[nav.length - 1]);
        break;
      case 'ArrowRight':
      case 'Enter':
      case ' ':
        if (entry?.kind === 'submenu' && active !== null) openSubAt(active, true);
        else if (entry?.kind === 'action' && e.key !== 'ArrowRight') onActivate(entry.run);
        break;
      case 'ArrowLeft':
        if (!onExit) return;
        onExit();
        break;
      case 'Escape':
        if (onExit) onExit();
        else onClose();
        break;
      case 'Tab':
        onClose();
        break;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const itemId = (i: number) => `${id}-${i}`;

  return (
    <div
      ref={ref}
      data-imf-context-menu
      role="menu"
      tabIndex={-1}
      aria-activedescendant={active !== null ? itemId(active) : undefined}
      style={{ ...menuStyle, left: pos.left, top: pos.top }}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={onKeyDown}
      // Nested submenus live inside their parent row; keep their clicks from toggling it.
      onClick={(e) => e.stopPropagation()}
    >
      {entries.map((entry, i) => {
        if (entry.kind === 'separator') {
          if (!entry.title) return <div key={i} role="separator" style={separatorStyle} />;
          return (
            <div key={i} role="separator" aria-label={entry.title} title={entry.description || undefined} style={i === 0 ? headerStyle : { ...headerStyle, ...headerRuleStyle }}>
              {entry.title}
            </div>
          );
        }
        const highlighted = active === i || openSub?.index === i;
        if (entry.kind === 'submenu') {
          const sub = openSub?.index === i ? openSub : null;
          return (
            <div
              key={i}
              id={itemId(i)}
              ref={(el) => {
                rows.current[i] = el;
              }}
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded={!!sub}
              title={entry.description || undefined}
              style={{ ...itemStyle, ...(highlighted ? itemHoverStyle : null) }}
              onPointerEnter={() => {
                setActive(i);
                if (openSub?.index === i) clearTimeout(timer.current);
                else if (!openSub) openSubAt(i, false);
                else later(() => openSubAt(i, false));
              }}
              onClick={() => (sub ? closeSub() : openSubAt(i, false))}
            >
              <span style={markStyle} />
              <span style={titleStyle}>{entry.title}</span>
              <span style={chevronStyle}>›</span>
              {sub && (
                <MenuList
                  key={`${i}-${sub.focus}`}
                  entries={entry.entries}
                  x={sub.x}
                  y={sub.y}
                  flipX={sub.flipX}
                  autoFocus={sub.focus}
                  initialActive={sub.focus ? firstNavigable(entry.entries) : null}
                  onActivate={onActivate}
                  onClose={onClose}
                  onExit={closeSub}
                />
              )}
            </div>
          );
        }
        const role = entry.mark === 'check' ? 'menuitemcheckbox' : entry.mark === 'radio' ? 'menuitemradio' : 'menuitem';
        return (
          <div
            key={i}
            id={itemId(i)}
            ref={(el) => {
              rows.current[i] = el;
            }}
            role={role}
            aria-checked={entry.mark ? entry.checked : undefined}
            title={entry.description || undefined}
            style={{ ...itemStyle, ...(highlighted ? itemHoverStyle : null) }}
            onPointerEnter={() => {
              setActive(i);
              if (openSub) later(closeSub);
            }}
            onPointerLeave={() => setActive((a) => (a === i ? null : a))}
            onClick={() => onActivate(entry.run)}
          >
            <span style={markStyle}>{entry.checked ? (entry.mark === 'radio' ? '●' : '✓') : ''}</span>
            <span style={titleStyle}>{entry.title}</span>
          </div>
        );
      })}
    </div>
  );
}

const menuStyle: CSSProperties = {
  position: 'fixed',
  zIndex: 1000,
  minWidth: 180,
  maxHeight: '90vh',
  overflowY: 'auto',
  padding: '4px 0',
  background: 'var(--tb-sidebar-bg)',
  color: 'var(--tb-text)',
  border: '1px solid var(--tb-border)',
  borderRadius: 4,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
  fontSize: 13,
  userSelect: 'none',
  outline: 'none',
};

const itemStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '4px 10px 4px 4px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

const itemHoverStyle: CSSProperties = { background: 'var(--tb-accent-soft)' };

const markStyle: CSSProperties = { width: 18, textAlign: 'center', flexShrink: 0 };

const titleStyle: CSSProperties = { flex: 1 };

const chevronStyle: CSSProperties = { marginLeft: 16, opacity: 0.7 };

const separatorStyle: CSSProperties = { height: 1, margin: '4px 0', background: 'var(--tb-border)' };

const headerStyle: CSSProperties = {
  padding: '4px 10px 2px 22px',
  fontSize: 11,
  fontWeight: 600,
  opacity: 0.65,
  whiteSpace: 'nowrap',
  cursor: 'default',
};

const headerRuleStyle: CSSProperties = { marginTop: 4, borderTop: '1px solid var(--tb-border)' };
