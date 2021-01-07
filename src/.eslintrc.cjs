"use strict";

const restrictedGlobals = require("confusing-browser-globals");

module.exports = {
	env: {
		browser: true
	},
	extends: [
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:testing-library/react",
		"plugin:jest-dom/recommended",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: [
		"jest-dom",
		"react",
		"react-hooks",
		"testing-library",
	],
	rules: {
		"jsx-quotes": "error",
		"no-restricted-globals": ["error", ...restrictedGlobals],
		// No longer needed for JSX as Babel handles the imports.
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
	},
	settings: {
		react: {
			version: "detect"
		}
	}
};
