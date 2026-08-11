import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
// export default defineConfig(({ command }) => {
  return {
    // The site is served from a subfolder on GitHub Pages, not the domain root.
    base: '/python-dsa-daily-master/',

    // Only use the subfolder path when building for GitHub Pages.
    // Local dev (`command === 'serve'`) stays at the root.
    // base: command === 'build' ? '/python-dsa-daily-master/' : '/',

    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
