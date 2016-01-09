module.exports = function(gulp, plugins) {
    function isHtml(file) {
        return plugins.match(file, ["**/*/*.html"]);
    }

    return function() {
        return gulp.src(["src/**/*(!es6).js", "src/**/*.html"])
            .pipe(plugins.if(isHtml, plugins.embedlr({
                src: "http://localhost:35729/livereload.js"
            })))
            .pipe(gulp.dest("dist"))
            .pipe(plugins.livereload());
    };
};
