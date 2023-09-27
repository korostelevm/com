module.exports = {
  runtimeCompiler: true,
  transpileDependencies: [/node_modules[/\\]marked[/\\]/],
  chainWebpack: (config) => {
    config.module
      .rule("raw")
      .test(/\.md$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
  configureWebpack: config => {
    //   // mutate config for production...
    // } else {
     return {
      // output: {
      //   filename: 'public/mizrofrontend.js',
      // },
      devServer: {
        open: true,
        // contentBase: './',
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            // pathRewrite: {'/api' : ''}
          },
          '/blog': {
            target: 'http://localhost:3000',
            // pathRewrite: {'/api' : ''}
          }
        }
      }
     }
    }
};
