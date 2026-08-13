/** @type {import("prettier").Config} */
export default {
    pluginSearchDirs: false,
    printWidth: 120,
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    bracketSpacing: false,
    endOfLine: 'auto',
    phpVersion: '8.1',
    trailingCommaPHP: true,
    overrides: [
        {
            files: '*.yaml',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.yml',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
