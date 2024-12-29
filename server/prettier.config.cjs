module.exports = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 80,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'avoid',
    requirePragma: false,
    insertPragma: false,
    proseWrap: 'never',
    htmlWhitespaceSensitivity: 'strict',
    endOfLine: 'auto',
    singleAttributePerLine: false,
    jsxSingleQuote: true,
    quoteProps: 'as-needed',
    useTabs: true,
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            options: {
                printWidth: 100,
                tabWidth: 4,
            },
        },
        {
            files: ['*.json', '*.json5'],
            options: {
                printWidth: 200,
                tabWidth: 2,
            },
        },
        {
            files: ['*.md', '*.mdx'],
            options: {
                printWidth: 80,
                proseWrap: 'always',
            },
        },
        {
            files: '.prettierrc',
            options: {
                parser: 'json',
            },
        },
    ],
};
