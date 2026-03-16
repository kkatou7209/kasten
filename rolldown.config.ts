import { defineConfig } from 'rolldown/config';
import { dts } from 'rolldown-plugin-dts'

export default defineConfig({
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].js',
    },
    plugins: [
        dts(),
    ]
});