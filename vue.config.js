const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');
const name = packageJson.name || 'digitalred';
function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = process.env.port || process.env.npm_config_port || 2048;
const api = process.env.api || process.env.npm_config_api || 800;

if (process.env.NODE_ENV === 'development') {
  console.log(`\n接口对应为${api}环境\n`);
}
const proxyContext = {
  500: 'https://dev.metaboxglobal.cn',
  800: 'https://www.metaboxglobal.cn',
};
console.log(proxyContext[api === 'other' ? '500' : api])
console.log(process.env.BASE_URL)
module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: "dist",
  // publicPath: "./",
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '^/api': {
        ws: false,
        target: proxyContext[api === 'other' ? '500' : api],
        pathRewrite: {
          "^/api": "/api"
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        // modifyVars: {
        //   green: "#576DE1"
        // }
      },
      postcss: {
        plugins: [
          /* rem适配忽略文件目录 */
          require('postcss-px2rem-exclude')({
            remUnit: 75,  // 参数 1
            exclude: /node_modules|vant/i,  // 参数 2
          }),
        ],
      },
    }
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        'vue$':'vue/dist/vue.esm.js',
        '@': resolve('src'),
      },
    },
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ]);

    config.plugins.delete('prefetch');

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    config.when(process.env.NODE_ENV !== 'development', (conf) => {
      conf
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      conf.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      conf.optimization.runtimeChunk('single');
      conf.plugin('CompressionWebpackPlugin')
        .use('compression-webpack-plugin');
    });
  },

}
