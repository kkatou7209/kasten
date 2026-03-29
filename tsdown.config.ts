import { defineConfig } from 'tsdown';

export default defineConfig({
    outDir: './dist',
    entry: 'src/index.ts',
    format: ['esm', 'cjs'],
    platform: 'neutral',
    tsconfig: './tsconfig.json',
    clean: true,
    sourcemap: true,
    treeshake: true,
    alias: {
        '@': './src',
    },
    dts: true,
});