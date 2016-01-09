module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src("src/sass/**/*.scss")
            .pipe(plugins.sass.sync().on("error", plugins.sass.logError))
            .pipe(gulp.dest("dist/css"));
    };
};
