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
      ChromeDriver: {
        base: "Chrome",
        flags: ["--no-sandbox"],
        browserName: "chrome",
        chromeDriver: "C:/Program Files/Google/Chrome/Application", // Automatically uses the installed ChromeDriver
      },
    },
    browsers: ["ChromeHeadless"], // Use ChromeDriver instead of Chrome
    reporters: ["progress", "kjhtml", "spec", "coverage"],
    preprocessors: {
      "src/**/*.ts": ["coverage"],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true,
  });
};
