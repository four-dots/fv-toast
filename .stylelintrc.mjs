/** @type {import('stylelint').Config} */
export default {
    plugins: ['stylelint-prettier'],
    extends: ['stylelint-config-recommended-scss', 'stylelint-config-recommended-vue'],
    rules: {
        'no-descending-specificity': null,
        'no-invalid-position-at-import-rule': null,
    },
};
