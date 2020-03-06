import vue from "rollup-plugin-vue"; // Handle .vue SFC files
import commonjs from "rollup-plugin-commonjs";
import css from "rollup-plugin-css-only";
import babel from "rollup-plugin-babel";

export default {
    input: "src/index.js", // Path relative to package.json
    external: ["nanoid"],
    output: [
        {
            name: "BulmaVueAccordion",
            exports: "named",
            format: "umd",
            file: "dist/index.umd.js"
        },
        {
            name: "BulmaVueAccordion",
            exports: "named",
            format: "es",
            file: "dist/index.esm.js"
        },
        {
            name: "BulmaVueAccordion",
            exports: "named",
            format: "iife",
            file: "dist/index.min.js"
        }
    ],
    plugins: [
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true // Explicitly convert template to render function
        }),
        commonjs(),
        babel({
            exclude: "node_modules/**"
        })
    ]
};
