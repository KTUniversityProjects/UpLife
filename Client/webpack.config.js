//Custom
let pathToCore = `./src/core/`;
//Common
const path = require("path");
const merge = require("webpack-merge");
let HtmlWebpackPlugin = require("html-webpack-plugin");
//Prod
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
//Loaders
let cssLoader = {
  loader: "css-loader",
  options: {
    modules: {
      localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
    }
  }
};
let sassLoader = {
  loader: "sass-loader",
  options: {
    sourceMap: true,
    sourceMapContents: false,
    data: '@import "main";',
    includePaths: ["./src/core/scss"]
  }
};
const common = merge([
  {
    entry: pathToCore + "index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        },
        {
          test: /\.html$/,
          use: ["html-loader"]
        },
        {
          test: /\.(jpg|svg|png)$/,
          use: ["file-loader?name=img/[name][hash].[ext]"]
        }
      ]
    }
  }
]);

const dev = merge([
  {
    mode: "development",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "public")
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: pathToCore + "index.html"
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ["style-loader", cssLoader, sassLoader]
        }
      ]
    },
    devServer: {
      hot: true
    }
  }
]);

const prod = merge([
  {
    mode: "production",
    output: {
      filename: "[name].[contentHash].bundle.js",
      path: path.resolve(__dirname, "public")
    },
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin(),
        new HtmlWebpackPlugin({
          template: pathToCore + "index.html",
          minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true
          }
        })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contentHash].css"
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()]
        }
      }),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            cssLoader,
            "postcss-loader",
            sassLoader
          ]
        }
      ]
    }
  }
]);

module.exports = mode => {
  if (mode === "development") {
    return merge(common, dev, { mode });
  }
  return merge(common, prod);
};
