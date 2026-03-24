const customWebpackConfig = require("./webpack.config");

module.exports = {
  stories: ["../src/**/*.stories.@(js|mdx)"],
  staticDirs: ["../static"],
  addons: ["@storybook/addon-actions", "@storybook/addon-docs"],
  core: {
    builder: "webpack5"
  },
  typescript: {
    reactDocgen: "react-docgen"
  },
  webpackFinal: async (config) => customWebpackConfig({ config })
};
