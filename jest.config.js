export default {
	collectCoverageFrom: [
		"<rootDir>/src/**/*.(js|ts)",
	],
	coverageProvider: "v8",
	injectGlobals: false,
	setupFiles: [
		"core-js/stable/index.js",
	],
	setupFilesAfterEnv: [
		"./config/jest.env.setup.ts",
	],
	testEnvironment: "jsdom",
	testMatch: [
		"<rootDir>/src/**/*.test.js",
	],
	testRunner: "jest-circus/runner",
	transformIgnorePatterns: [],
	resetMocks: true,
};
