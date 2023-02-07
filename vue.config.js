const path = require('path')

module.exports = {
    publicPath: '/devops',
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.module
            .rule('eslint')
            .test(/\.(js|vue)$/)
            .use('eslint-loader')
            .loader('eslint-loader')
            .tap(() => ({
                fix: true,
                formatter: require('eslint-friendly-formatter')
            }))

        config.module
            .rule('cw-svg')
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, 'src'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')

        config.module.rule('svg').exclude.add(path.resolve(__dirname, 'src')).end()
    },
    devServer: {
        port: 8878,
        disableHostCheck: true
    }
}
