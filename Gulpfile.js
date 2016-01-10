var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

function getTask(task) {
    return require("./build/tasks/" + task)(gulp, plugins);
}

gulp.task("test", getTask("test"));
gulp.task("tdd", getTask("tdd"));
gulp.task("lint", getTask("lint"));
gulp.task("clean", getTask("clean"));
gulp.task("copy", ["clean"], getTask("copy"));
gulp.task("sass", ["clean"], getTask("sass"));

gulp.task("compile", ["clean"], getTask("compile"));
gulp.task("watch", ["clean"], getTask("watch"));

gulp.task("build", ["lint", "test", "compile", "sass", "copy"]);
gulp.task("run", ["clean", "compile", "copy", "sass"], getTask("run"));
gulp.task("run:dev", ["watch", "run"]);
