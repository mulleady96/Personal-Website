/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-spec-reporter"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "../coverage"),
      reporters: [
        { type: "html", subdir: "html" },
        { type: "lcovonly", subdir: ".", file: "lcov.info" },
        { type: "text-summary" },
      ],
      fixWebpackSourcePaths: true,
    },
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"], // Flags useful for CI environments
      },
    },
    browsers: ["ChromeHeadlessCustom"], // Custom headless chrome configuration
    reporters: ["kjhtml", "spec", "coverage", "progress"], // Removed progress for cleaner output
    preprocessors: {
      "src/**/*.ts": ["coverage"], // Keep for coverage, or refine to exclude test files
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true,
  });
};
