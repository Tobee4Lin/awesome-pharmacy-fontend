module.exports = {
    lintOnSave: true,

    devServer: {
        port: 8088,
        proxy: {
            // proxy all requests starting with /api to jsonplaceholder
            '/api': {
                target: 'http://localhost:8080/shop/public/index/',   //代理接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''    //代理的路径
                }
            }
        }
    }
}