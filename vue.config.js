module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/format/'
    : '/',
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },
  lintOnSave: false,
};
