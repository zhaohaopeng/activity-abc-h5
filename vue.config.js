module.exports = {
  productionSourceMap: false,
  lintOnSave: false, //关闭eslint检查
  publicPath: '/ccq/',
  devServer: {
    open: true
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "深圳_生活_出行有礼";
        return args;
      })
  },
}