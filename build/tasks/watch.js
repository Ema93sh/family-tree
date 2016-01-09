module.exports = function(gulp, plugins) {
    return function() {
        plugins.livereload.listen();
        gulp.watch("src/**/*.es6.js", ["compile"]);
        gulp.watch(["src/**/*.js", "src/**/*.html"], ["copy"]);
        gulp.watch(["src/sass/*.scss"], ["sass"]);
    };
};
