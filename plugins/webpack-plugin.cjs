function webpackPlugin(context, options) {
  return {
    name: 'webpack-plugin',
    configureWebpack(config, isServer, { currentBundler }) {
      return {
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
            // Handle WebAssembly files (for Shiki)
            {
              test: /\.wasm$/,
              type: 'asset/resource',
              generator: {
                filename: 'static/wasm/[name][ext]',
              },
            },
          ],
        },
        plugins: [
          new currentBundler.instance.ProvidePlugin({
            process: require.resolve('process/browser'),
          }),
        ],
        resolve: {
          fallback: {
            stream: require.resolve('stream-browserify'),
            path: require.resolve('path-browserify'),
            buffer: require.resolve('buffer/'),
            url: require.resolve('url'),
            crypto: false,
          },
          alias: {
            process: 'process/browser.js',
          },
        },
        experiments: {
          ...config.experiments,
          asyncWebAssembly: true,
        },
      };
    },
  };
}

module.exports = {
  webpackPlugin,
};
