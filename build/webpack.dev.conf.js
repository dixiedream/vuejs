"use strict";
const utils = require("./utils");
const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");

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
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join("/", "index.html"),
        },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || "0.0.0.0",
    port: PORT || 8080,
    open: false,
    overlay: { warnings: false, errors: true },
    publicPath: "/",
    proxy: {},
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_PATH: JSON.stringify(API_BASE_PATH),
      "process.env.NODE_ENV": '"development"',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: "static",
        ignore: [".*"],
      },
    ]),
  ],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT || 8080;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
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
