"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const basePlugins = require("./webpackBasePlugins");

const { NODE_ENV, npm_config_report } = process.env;

const env = NODE_ENV === "testing" ? '"testing"' : '"production"';

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true,
      usePostCSS: true,
    }),
  },
  devtool: "#source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    ...basePlugins,
    new webpack.DefinePlugin({
      API_BASE_PATH: JSON.stringify("/api/"),
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } },
    }),
    new HtmlWebpackPlugin({
      filename:
        NODE_ENV === "testing"
          ? "index.html"
          : path.resolve(__dirname, "../dist/index.html"),
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: "dependency",
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   minChunks(module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
    //     );
    //   },
    // }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "manifest",
    //   minChunks: Infinity,
    // }),
    // // This instance extracts shared chunks from code splitted chunks and bundles them
    // // in a separate chunk, similar to the vendor chunk
    // // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "app",
    //   async: "vendor-async",
    //   children: true,
    //   minChunks: 3,
    // }),

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

// Gzip off by default as many popular static hosts such as
// Surge or Netlify already gzip all static assets for you.
// Before setting to `true`, make sure to:
// npm install --save-dev compression-webpack-plugin
// const CompressionWebpackPlugin = require("compression-webpack-plugin");
// webpackConfig.plugins.push(
//   new CompressionWebpackPlugin({
//     asset: "[path].gz[query]",
//     algorithm: "gzip",
//     test: new RegExp("\\.(js|css)$"),
//     threshold: 10240,
//     minRatio: 0.8,
//   })
// );

// Run the build command with an extra argument to
// View the bundle analyzer report after build finishes:
// `npm run build --report`
// Set to `true` or `false` to always turn it on or off
if (npm_config_report) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
