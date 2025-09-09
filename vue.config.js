const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 这里指向我们 server.js 的地址
        changeOrigin: true,
      },
    },
  },
};
