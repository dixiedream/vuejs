"use strict";
const utils = require("./utils");
const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");
const basePlugins = require("./webpackBasePlugins");

const { HOST, PORT, API_BASE_PATH } = process.env;

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      usePostCSS: true,
    }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: "cheap-module-eval-source-map",
  devServer: {
    clientLogLevel: "warning",
    compress: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join("/", "index.html"),
        },
      ],
    },
    host: HOST || "0.0.0.0",
    hot: true,
    open: false,
    overlay: { warnings: false, errors: true },
    port: PORT || 8080,
    publicPath: "/",
    proxy: {},
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false,
    },
  },
  plugins: [
    ...basePlugins,
    new webpack.DefinePlugin({
      API_BASE_PATH: JSON.stringify(API_BASE_PATH),
      "process.env.NODE_ENV": '"development"',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
    // copy custom static assets
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: "static",
          globOptions: {
            ignore: [".*"],
          },
        },
      ],
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT || 8080;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`,
            ],
          },
          onErrors: utils.createNotifierCallback(),
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
