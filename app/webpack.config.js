const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const config = {
    mode: "production",
    entry: ["./src/index.tsx"],
    target: "node",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js"
    },
    node: {
      __dirname: false,
      __filename: false
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: { cacheDirectory: true, cacheCompression: false }
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg|bmp)$/i,
          use: [{ loader: "file-loader" }]
        },
        {
          test: /\.node/i,
          use: [{ loader: "node-loader" }, { loader: "file-loader" }]
        }
      ]
    },
    plugins: [],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
    },
    externals: [
      function(_, request, callback) {
        if (/^iohook|robotjs$/.test(request)) {
          return callback(null, "commonjs " + request);
        }
        callback();
      }
    ]
  };

  if (argv.mode === "development") {
    config.mode = "development";
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
    config.devtool = "source-map";
    config.watch = true;
    config.entry.unshift("webpack/hot/poll?100");
  }

  if (argv.p) {
    config.plugins.push(new CleanWebpackPlugin());
  }
  return config;
};
