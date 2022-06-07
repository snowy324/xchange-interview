const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        additionalData: `@import '@globalStyle/global.less';`
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'CloudTravel';
        return args;
      });
    config.resolve
      .alias
      .set('@views', path.resolve('src/views'))
      .set('@globalStyle', path.resolve('src/globalStyle'))
      .set('@request', path.resolve('src/request'))
      .set('@store', path.resolve('src/store'))
      .set('@assets', path.resolve('src/assets'))
      .set('@pc', path.resolve('src/views/CloudTravel/components/Pc'))
      .set('@mobile', path.resolve('src/views/CloudTravel/components/Mobile'));
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
          options.compiler = require('vue-template-babel-compiler')
          return options
      });
  },
  devServer: {
    proxy: "https://hiring.zumata.xyz/",
  }
});
