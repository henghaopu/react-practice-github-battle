const path = require("path");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
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
  mode: "development"
};
