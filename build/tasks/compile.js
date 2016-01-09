module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src("src/**/*.es6.js")
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.babel())
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest("dist"))
            .pipe(plugins.livereload());
    };
};
