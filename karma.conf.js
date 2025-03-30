const path = require("path");

module.exports = function (config) {
  config.set({
    frameworks: ["mocha"],

    files: [
      { pattern: "test/**/*.test.js", type: "module" } // Update path if needed
    ],

    browsers: ["ChromeHeadless"], // Use "Chrome" for debugging

    singleRun: true, // Set to false for watch mode

    reporters: ["mocha"],

    plugins: [
      "karma-mocha",
      "karma-chrome-launcher",
      "karma-mocha-reporter",
      "karma-webpack",
      "karma-babel-preprocessor"
    ],

    preprocessors: {
      "test/**/*.test.js": ["webpack", "babel"] // Enable Babel for test files
    },

    webpack: {
      mode: "development",
      resolve: {
        extensions: [".js"]
      },
      module: {
        rules: [
          {
            test: /\.(jpg|jpeg|png|gif|svg)$/,
            use: ["url-loader"] // Handling image files as data URIs
          }
        ]
      }
    },

    babelPreprocessor: {
      options: {
        presets: [["@babel/preset-env", { targets: { esmodules: true } }]]
      }
    }
  });
};
