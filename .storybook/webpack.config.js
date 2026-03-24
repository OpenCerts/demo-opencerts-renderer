const webpack = require("webpack");

module.exports = ({ config }) => {
  // looks like storybook having trouble with emotion as for now => manually configuration webpack

  // re-apply babel configuration as available in package.json (storybook doesn't pick it)
  config.module.rules[0].use[0].loader = require.resolve("babel-loader");
  config.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-env", {
      targets: {
        node: "current"
      }
    }),
    require.resolve("@babel/preset-typescript"),
    require.resolve("@babel/preset-react"),
    require.resolve("@emotion/babel-preset-css-prop")
  ];

  // Storybook 6 + TypeScript 5 breaks older react-docgen-typescript-loader internals.
  // Keep TS/TSX transpilation here, but skip docgen loader to avoid build failures.
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [require.resolve("babel-loader")]
  });
  config.resolve.extensions.push(".ts", ".tsx");
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    vm: require.resolve("vm-browserify"),
    buffer: require.resolve("buffer/"),
    process: require.resolve("process/browser"),
    assert: require.resolve("assert/"),
    util: require.resolve("util/"),
    fs: false
  };
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser"
    })
  );
  return config;
};
