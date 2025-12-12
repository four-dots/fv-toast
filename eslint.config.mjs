import eslintPerfectionist from 'eslint-plugin-perfectionist';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    eslintPluginUnicorn.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    eslintPerfectionist.configs['recommended-line-length'],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'perfectionist/sort-objects': 'off',
            'vue/block-order': ['error', {order: ['template', 'script', 'style']}],
            'vue/multi-word-component-names': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/filename-case': 'off',
            'unicorn/no-null': 'off',
            'unicorn/explicit-length-check': 'off',
            'unicorn/no-await-expression-member': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/prefer-number-properties': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/prefer-top-level-await': 'warn',
            'no-empty': ['error', {allowEmptyCatch: true}],
        },
    },
    eslintConfigPrettier,
];
