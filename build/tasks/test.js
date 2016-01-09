var path = require("path");
var karma = require("karma").server;

module.exports = function() {
    return function(done) {
        karma.start({
            configFile: path.join(__dirname, "../../karma.conf.js"),
            singleRun: true
        }, function() {
            done();
        });
    };
};
