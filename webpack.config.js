const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      // run babel-loader on every .js file
      // and specify the transformations we want babel to make in package.json
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      // As every .css file is being imported/loaded, 
      // the loader preprocesses/transforms the source code of the module.
      //   css-loader: @import url(style.css) => require('./style.css')
      //   style-loader: import "./xxx.css" => <style>...</style> 
      {
        test: /\.css$/, 
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  mode: "development",
  // plugins allow webpack to execute certain tasks after the bundle 
  // has been created.
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/index.html"
    })
  ]
};
