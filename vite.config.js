import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    mode: 'production',
    plugins: [vue()],
    // Make sure we can do @/components/xxx style imports
    // alias: [
    //     {
    //         find: '@',
    //         replacement: path.resolve(__dirname, 'src'),
    //     },
    // ],
    // Enable library mode: only create ES builds
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            name: 'BulmaVueSelect',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['nanoid', 'mitt', 'vue'],
        },
    },
});
