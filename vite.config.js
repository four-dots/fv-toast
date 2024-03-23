import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'FVToast',
        },
        rollupOptions: {
            external: ['marked', 'mitt', 'nanoid', 'vue'],
        },
    },
});
