import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
    ]),
    {
        rules: {
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'warn',
            'class-methods-use-this': 'off',
            'lines-between-class-members': 'off',
            'no-console': ['warn', { allow: ['warn', 'error', 'debug', 'group', 'groupEnd'] }],
            'no-debugger': 'warn',
            'no-empty': 'warn',
            'no-return-assign': 'off',
            'no-underscore-dangle': 'off',
            'prefer-destructuring': 'off',
            'prefer-template': 'off',
            'react/display-name': 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    name: 'next/link',
                    message: 'Use localized link from i18n/navigation',
                },
            ],
        },
    },
]);

export default eslintConfig;
