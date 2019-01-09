let mix = require('laravel-mix');

mix.setResourceRoot('/dist');
mix.setPublicPath('dist');
mix.js('src/app.js', 'dist/')
    .sass('src/app.scss', 'dist/')
    .browserSync({
        server: true,
        proxy: false,
        files: ['dist/app.css', 'dist/app.js'],
    });
