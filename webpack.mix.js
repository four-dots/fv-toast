const mix = require('laravel-mix');

mix.js('src/index.js', 'dist/').setPublicPath('dist/');

if (!mix.inProduction()) {
    mix.webpackConfig({
        devtool: 'inline-source-map',
    }).sourceMaps();
}
