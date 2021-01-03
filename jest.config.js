export default {
	collectCoverageFrom: [
		"src/**/*.(js|ts)",
	],
	coverageProvider: "v8",
	setupFiles: [
		"core-js/stable/index.js",
	],
	setupFilesAfterEnv: [
		"@testing-library/jest-dom",
	],
	testMatch: [
		"**/*.test.js",
	],
	testEnvironment: "jsdom",
	transform: {
		"\\.(js|ts)$": "<rootDir>/node_modules/babel-jest",
	},
	transformIgnorePatterns: [],
	resetMocks: true,
};
