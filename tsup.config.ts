import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { manager: 'src/ui/Manager.tsx' },
    format: ['esm'],
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    dts: true,
    external: ['react', 'react-dom', '@storybook/manager-api', '@storybook/theming', '@storybook/components'],
    esbuildOptions(options) {
      options.jsx = 'automatic';
    },
  },
  {
    entry: { preview: 'src/ui/Preview.tsx' },
    format: ['esm'],
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    dts: true,
    external: ['react', 'react-dom', '@storybook/preview-api'],
    esbuildOptions(options) {
      options.jsx = 'automatic';
    },
  },
  {
    entry: { preset: 'src/preset.ts' },
    format: ['esm'],
    target: 'node18',
    outDir: 'dist',
    sourcemap: true,
    dts: false,
  },
]);
