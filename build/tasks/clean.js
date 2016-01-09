var del = require("del");

module.exports = function(gulp, plugins) {
    return function(cb) {
        return del([
            "dist/**/*",
        ], cb);
    };
};
