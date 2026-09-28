import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// @imfusion/sdk has two dead fallback paths that reference ImFusionLib.wasm
// via a literal `new URL(...)`; both are bypassed by explicit overrides
// elsewhere, but Vite's static analysis still inlines the 14MB wasm file as
// base64 for each one, bloating dist/index.js from ~1MB to ~39MB. Rewriting
// each literal into an equivalent non-literal expression keeps them working
// but invisible to Vite's analyzer.
function neutralizeDeadWasmUrlInlining(): Plugin {
  const patches: Array<{ idSuffix: string; from: string; to: string }> = [
    {
      idSuffix: `${path.sep}@imfusion${path.sep}sdk${path.sep}dist${path.sep}index.js`,
      from: `new URL('../wasm/ImFusionLib.wasm', import.meta.url)`,
      to: `new URL('..'.concat('/wasm/ImFusionLib.wasm'), import.meta.url)`,
    },
    {
      idSuffix: `${path.sep}@imfusion${path.sep}sdk${path.sep}wasm${path.sep}ImFusionLib.js`,
      from: `new URL("ImFusionLib.wasm",import.meta.url)`,
      to: `new URL("ImFusionLib.wasm".concat(""),import.meta.url)`,
    },
  ];

  return {
    name: 'imfusion-neutralize-dead-wasm-url-inlining',
    enforce: 'pre',
    transform(code, id) {
      const patch = patches.find((p) => id.endsWith(p.idSuffix));
      if (!patch) return null;
      // Fail loudly rather than silently skipping: an SDK upgrade that
      // reformats either literal would otherwise base64-inline the 15MB wasm
      // into dist/index.js on a green build.
      if (!code.includes(patch.from)) {
        throw new Error(
          `imfusion-neutralize-dead-wasm-url-inlining: pattern not found in ${id}. ` +
            'The WebSDK changed; update the literal in vite.config.ts.',
        );
      }
      return { code: code.split(patch.from).join(patch.to), map: null };
    },
  };
}

export default defineConfig({
  // React/react-dom's CJS builds branch on `process.env.NODE_ENV` at load
  // time; in library mode Vite's default esbuild define never reaches them,
  // so the literal survives and throws `ReferenceError: process is not
  // defined` at runtime. This define replaces it across the whole bundle.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    neutralizeDeadWasmUrlInlining(),
    react(),
    // The WebSDK's ~14MB wasm binary isn't reachable via normal module
    // bundling; copy it next to the built index.js, matching the flat
    // static/ layout plugin.py expects. The backend serves it at the route
    // "/wasm/ImFusionLib.wasm" (see the override in src/index.tsx).
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(rootDir, 'node_modules/@imfusion/sdk/wasm/ImFusionLib.wasm'),
          dest: '.',
        },
      ],
    }),
  ],
  // Dev-server esbuild pre-bundling chokes on the SDK's wasm glue code, so
  // it's excluded here. Production `vite build` still bundles it normally
  // via Rollup.
  optimizeDeps: {
    exclude: ['@imfusion/sdk'],
  },
  server: {
    // Defensive only: this wasm build doesn't require cross-origin
    // isolation today, but these headers are harmless to keep in case that
    // changes.
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    lib: {
      entry: path.resolve(rootDir, 'src/index.tsx'),
      formats: ['es'],
      fileName: () => 'index.js',
      // TensorBoard imports this as a single ES module, so no code-splitting
      // or separate CSS file: everything goes into index.js.
      cssFileName: 'index',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
