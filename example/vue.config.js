module.exports = {
  devServer: {
    proxy: {
      '/pdf/': {
        target: 'http://localhost:12345',
        changeOrigin: true
      }
    }
  }
}