import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    resolve: {alias: {vue: 'vue/dist/vue.esm-bundler.js'}},
    root: './demo',
    base: '/demo/dist/',
    build: {
        sourcemap: true,
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    whitespace: 'preserve',
                },
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
