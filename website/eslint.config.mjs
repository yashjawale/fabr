// @ts-check

import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import astro from 'eslint-plugin-astro'

export default [
	eslint.configs.recommended,
	...astro.configs.recommended,
	prettier,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {
			// Code style preferences (let Prettier handle formatting)
			'semi': ['error', 'never'],

			// Basic TypeScript rules
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'warn', // Warn instead of error for generated files
			'@typescript-eslint/no-explicit-any': 'off', // Allow any in generated files

			// Disable problematic rules for generated files
			'no-undef': 'off',
			'no-redeclare': 'off',
			'no-useless-escape': 'off',
			'no-empty': 'off',
		},
	},
	{
		// More lenient rules for dist/build directories
		files: ['dist/**/*', '.astro/**/*', 'node_modules/**/*'],
		rules: {
			// Disable all rules for generated/build files
			'@typescript-eslint/no-unused-vars': 'off',
			'no-unused-vars': 'off',
			'quotes': 'off',
			'semi': 'off',
			'no-undef': 'off',
			'no-redeclare': 'off',
			'no-useless-escape': 'off',
			'no-empty': 'off',
			'space-infix-ops': 'off',
			'keyword-spacing': 'off',
			'object-curly-spacing': 'off',
			'space-before-function-paren': 'off',
			'eol-last': 'off',
		},
	},
]
