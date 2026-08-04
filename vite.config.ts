import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.ts',
      name: 'MeteoSwissWeatherCard',
      fileName: () => 'meteoswiss-weather-card.js',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'meteoswiss-weather-card.js',
        dir: 'dist',
        inlineDynamicImports: true,
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    emptyOutDir: true,
  },
  esbuild: {
    target: 'esnext',
    format: 'esm',
  },
});
