module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        "@vue/prettier"
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "import/no-unresolved": [
            2,
            {
                "ignore": ["^@parent-theme", "^@theme", "^@AlgoliaSearchBox", "^@SearchBox"] // @ 是设置的路径别名
            },
        ],
    },
};
