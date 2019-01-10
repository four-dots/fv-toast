import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
export default {
    input: 'src/index.js', // Path relative to package.json
    external: ['nanoid'],
    output: {
        name: 'BulmaVueAccordion',
        exports: 'named',
    },
    plugins: [
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
    ],
};
