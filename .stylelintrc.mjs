/** @type {import('stylelint').Config} */
export default {
    plugins: ['stylelint-prettier'],
    extends: ['stylelint-config-recommended-scss', 'stylelint-config-recommended-vue', 'stylelint-config-html'],
    rules: {
        'no-descending-specificity': null,
        'no-invalid-position-at-import-rule': null,
    },
    overrides: [
        // {
        //     files: ['**/*.(scss|css|vue)'],
        //     customSyntax: 'postcss-scss',
        // },
        // {
        //     files: ['**/*.vue'],
        //     customSyntax: 'postcss-html',
        // },
    ],
};
