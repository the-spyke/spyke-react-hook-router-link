"use strict";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

module.exports = {
	plugins: [
		[
			"babel-plugin-add-import-extension",
			{
				extension: "js",
			}
		],
	],
	presets: [
		IS_TEST_ENV && [
			"@babel/preset-env",
			{
				// "bugfixes" will be enabled by default in Babel 8.
				bugfixes: true,
				corejs: 3,
				modules: "commonjs",
				useBuiltIns: "entry",
				// Jest doesn't support ES Modules because of custom `require()` hooks.
				// Jest runs all tests on Node and in JSDOM
				targets: {
					node: "current",
				},
			}
		],
		IS_TEST_ENV && [
			"@babel/preset-react",
			{
				// This toggles behavior specific to development, such as adding __source and __self.
				development: true,
				// Decides which runtime to use:
				// - `automatic` auto imports the functions that JSX transpiles to.
				// - `classic` does not automatic import anything.
				runtime: "automatic",
			}
		],
		"@babel/preset-typescript",
	].filter(Boolean)
};
