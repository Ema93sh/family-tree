module.exports = function(gulp, plugins) {
    return function() {
        plugins.livereload.listen();
        gulp.watch("src/**/*.es6.js", ["compile", "sass"]);
        gulp.watch(["src/**/*.js", "src/**/*.html"], ["copy", "sass"]);
        gulp.watch(["src/sass/*.scss"], ["sass"]);
    };
};
