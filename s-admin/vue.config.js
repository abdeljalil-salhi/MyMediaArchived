module.exports = {
  publicPath: "./",

  configureWebpack: {
    // Remove buffer polyfill
    node: false,
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "MyMedia Socket Admin";
      return args;
    });
    config.plugin("define").tap((args) => {
      const version = require("./package.json").version;
      args[0]["process.env"]["VERSION"] = JSON.stringify(version);
      return args;
    });
    // Exclude 'moment' package (included by chart.js@2)
    config.externals({ moment: "moment" });
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },

  transpileDependencies: ["vuetify"],
};
