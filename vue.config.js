const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,

    devServer: {
        proxy: {
            '/v1': {
                target: 'https://www.mos.ru/rss',
                changeOrigin: true,
                pathRewrite: {
                    '^/v1': ''
                }
            },
            '/v2': {
                target: 'https://ria.ru/export/rss2/archive/index.xml',
                changeOrigin: true,
                pathRewrite: {
                    '^/v2': ''
                }
            }
        } 
    }
})
