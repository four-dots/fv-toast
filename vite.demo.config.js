import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vite';

export default defineConfig({
    root: './demo',
    resolve: {alias: {vue: 'vue/dist/vue.esm-bundler.js'}},
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    whitespace: 'preserve',
                },
                transformAssetUrls: {
                    img: [],
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
