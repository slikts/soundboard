const path = require("path");

module.exports = {
  entry: "./src/index.js",
  target: "node",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  externals: [
    function(_, request, callback) {
      if (/^node-portaudio|lame$/.test(request)) {
        return callback(null, "commonjs " + request);
      }
      callback();
    }
  ]
};
