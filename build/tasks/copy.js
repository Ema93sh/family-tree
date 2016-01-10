module.exports = function(gulp, plugins) {
    function isHtml(file) {
        return plugins.match(file, ["**/*/*.html"]);
    }
    function isCss(file) {
        return plugins.match(file, ["**/*/*.css"]);
    }

    return function() {
        return gulp.src(["src/**/*(!es6).js", "src/**/*.html", "src/**/*.jpg", "node_modules/bootstrap/dist/css/bootstrap.min.css"])
            .pipe(plugins.if(isHtml, plugins.embedlr({
                src: "http://localhost:35729/livereload.js"
            })))
            .pipe(plugins.if(isCss, gulp.dest("dist/css"), gulp.dest("dist")))
            .pipe(plugins.livereload());
    };
};
