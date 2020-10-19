const withPlugins = require("next-compose-plugins");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./styles/app.less"), "utf8")
);

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }
    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
        },
      },
    ],
    [
      withCSS,
      {
        cssModules: true,
      },
    ],
  ],
  nextConfig
);
