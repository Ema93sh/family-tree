module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src(["src/**/*.js", "src/**/*.es6", "specs/**/*.js", "specs/**/*.es6"])
            .pipe(plugins.eslint())
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.failOnError());
    };
};
