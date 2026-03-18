import { defineConfig } from 'rolldown/config';
import { dts } from 'rolldown-plugin-dts'
import path from 'path';

export default defineConfig({
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].js',
        minify: true,
    },
    plugins: [
        dts(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
});