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
};
