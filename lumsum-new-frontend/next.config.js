/* eslint-disable */
const withPlugins = require("next-compose-plugins");
const withAntdLess = require("next-plugin-antd-less");

const pluginAntdLess = withAntdLess({
  modifyVars: {
    "@primary-color": "#00a69c",
    "@link-color": "#505050",
    "@success-color": "#00a69c",
  },
});

module.exports = withPlugins([[pluginAntdLess]], {
  reactStrictMode: true,
  webpack(config) {
    return config;
  },
  async redirects() {
    return [
      {
        source: "/account",
        destination: "/account/profile",
        permanent: true,
      },
      {
        source: "/user",
        destination: "/user/login",
        permanent: true,
      },
    ];
  },
});
