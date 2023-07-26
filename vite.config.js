import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    mode: 'production',
    plugins: [vue()],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'BulmaVueSelect',
        },
        rollupOptions: {
            external: ['nanoid', 'mitt', 'vue'],
        },
    },
});
