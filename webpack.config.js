const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const IS_DEV = process.env.NODE_ENV === "development";
const IS_PROD = !IS_DEV;

module.exports = {
  entry: {
    app: ["./src/index.tsx"]
  },
  context: path.resolve(__dirname),
  mode: IS_DEV ? "development" : "production",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash:7].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: process.env.NODE_ENV, NET: "" }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `${__dirname}/static/index.html`
    }),
    ...(IS_PROD
      ? [
        new CompressionPlugin({ test: /\.(js|css|html|svg)$/ }),
        new BrotliPlugin({ test: /\.(js|css|html|svg)$/ }),
        new CopyWebpackPlugin({ patterns: [{ from: "static/images", to: "static/images" }] })
      ]
      : [])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /\/node_modules\//,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },

  // Using cheap-eval-source-map for build times
  // switch to inline-source-map if detailed debugging needed
  devtool: IS_PROD ? false : "eval-cheap-source-map",

  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 3010,
    allowedHosts: "all",
    client: {
      progress: true
    }
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "react-dom/client": path.resolve(__dirname, "node_modules/react-dom/client"),
      "react-dom/server": path.resolve(__dirname, "node_modules/react-dom/server"),
      "react-dom/test-utils": path.resolve(__dirname, "node_modules/react-dom/test-utils"),
      "react/jsx-runtime": path.resolve(__dirname, "node_modules/react/jsx-runtime"),
      "react/jsx-dev-runtime": path.resolve(__dirname, "node_modules/react/jsx-dev-runtime"),
      scheduler: path.resolve(__dirname, "node_modules/scheduler"),
    },
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      vm: require.resolve("vm-browserify"),
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/browser"),
      assert: require.resolve("assert/"),
      util: require.resolve("util/"),
      fs: false,
    },
  },
  ignoreWarnings: [
    {
      module: /node-bbs-signatures\/lib\/(bbsSignature|bls12381|bls12381toBbs)\.js/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],
  bail: true
};
