const path = require("path");
const ROOT_DIR = path.resolve(__dirname, "..");

module.exports = {
  entry: "./src/index.ts",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  node: {
    __dirname: false,
  },
  target: "node",
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.js$/, loader: "source-map-loader" },
    ],
  },
};
