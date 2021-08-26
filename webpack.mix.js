let mix = require('laravel-mix');
let webpack = require('webpack');

mix.webpackConfig({
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
});

mix.setResourceRoot('/dist');
mix.setPublicPath('demo/dist');

mix.js('demo/app.js', 'demo/dist/')
    .sass('demo/app.scss', 'demo/dist/')
    .sourceMaps(true)
    .browserSync({
        server: {
            baseDir: 'demo',
        },
        proxy: false,
        files: ['demo/dist/app.css', 'demo/dist/app.js'],
    })
    .vue();
