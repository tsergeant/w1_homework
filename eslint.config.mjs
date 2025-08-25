import js from '@eslint/js';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'script',
			ecmaVersion: 'latest',
			globals: {
				...globals.browser   // gives you console, window, document, etc.
			}
		},
		rules: {
			'no-unused-vars': ['warn', { args: 'none' }],
			'no-undef': 'error'
		}
	}
];
