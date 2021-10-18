"use strict";

const path = require("path");

module.exports = {
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
      @use '~@carbon/react/scss/breakpoint';
      @use '~@carbon/react/scss/theme';
      @use '~@carbon/react/scss/motion';
      @use '~@carbon/react/scss/type';
    `,
  },
  webpack(config) {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === "object")
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader.includes("css-loader") &&
          typeof moduleLoader.options.modules === "object"
        ) {
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              exportLocalsConvention: "camelCase", // https://github.com/webpack-contrib/css-loader#exportlocalsconvention
              mode: "local", // https://github.com/webpack-contrib/css-loader#mode
            },
          };
        }
      });
    });

    return config;
  },
};
