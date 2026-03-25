import { defineConfig } from 'rolldown/config';
import { dts } from 'rolldown-plugin-dts'
import path from 'path';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            entryFileNames: 'index.js',
            format: 'esm',
            dir: 'dist',
            sourcemap: true,
            codeSplitting: false,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    },
    {
        input: 'src/index.ts',
        output: {
            entryFileNames: 'index.cjs',
            format: 'cjs',
            sourcemap: true,
            codeSplitting: false,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    },
    {
        input: 'src/index.ts',
        plugins: [dts()],
        output: {
            dir: 'dist'
        },
    }
]);