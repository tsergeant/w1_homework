import js from '@eslint/js';

export default [
	js.configs.recommended,
	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'script',
			ecmaVersion: 'latest',
			globals: { window: 'readonly', document: 'readonly' }
		},
		rules: { 'no-unused-vars': ['warn', { args: 'none' }], 'no-undef': 'error' }
	}
];

