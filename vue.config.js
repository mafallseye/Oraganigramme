const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://192.168.1.174:5001/',
        changeOrigin: true,
      },
    }
  }
})

