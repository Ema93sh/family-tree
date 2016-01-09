// Karma configuration
// Generated on Sat Jul 04 2015 12:29:08 GMT+0530 (IST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "",


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["browserify", "jasmine"],


        // list of files / patterns to load in the browser
        files: [
          "src/**/*.js",
          "specs/**/*spec*.js"
        ],


        // list of files to exclude
        exclude: ["src/babel_transform.js", "src/main.es6.js"],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "**/*.es6.js": ["browserify"]
        },

        browserify: {
            transform: ["babelify"]
        },

        // test results reporter to use
        // possible values: "dots", "progress"
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["progress"],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["PhantomJS"],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
