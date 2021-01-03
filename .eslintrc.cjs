"use strict";

module.exports = {
	env: {
		es2021: true,
	},
	extends: [
		"@spyke/eslint-config",
	],
	ignorePatterns: [
		"**/__snapshots__/",
		"**/build/",
		"**/coverage/",
		"**/dist/",
		"**/node_modules/",
	],
	overrides: [
		{
			env: {
				// Disable jest globals to use it only from imports.
				jest: false,
				"jest/globals": false,
			},
			extends: [
				"plugin:jest/recommended",
			],
			files: [
				"**/*.test.js",
			],
			plugins: [
				"jest",
			],
			rules: {
				"jest/expect-expect": "off", // Too much noise.
			},
		},
		{
			env: {
				browser: false,
				node: true,
			},
			parserOptions: {
				sourceType: "script",
			},
			files: ["**/*.cjs"],
		},
	],
	parser: "babel-eslint",
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: "module",
	},
	root: true,
	rules: {
		"import/extensions": ["error", "always", { ts: "never" }],
	},
	settings: {
		"import/extensions": [
			".cjs",
			".js",
			".ts"
		],
		"import/resolver": {
			node: {
				extensions: [
					".cjs",
					".js",
					".ts"
				]
			}
		},
	}
};
