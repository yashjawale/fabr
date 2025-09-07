// @ts-check

import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	prettier,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: __dirname,
			},
		},
		rules: {
			// Code style preferences (let Prettier handle formatting)
			'semi': ['error', 'never'],

			// TypeScript specific rules for strict typing
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		},
	},
	{
		files: ['**/*.mjs'],
		extends: [tseslint.configs.disableTypeChecked],
	}
)
