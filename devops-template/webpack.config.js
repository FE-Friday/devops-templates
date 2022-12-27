const webpackBaseConfig = require('../webpack.base')

module.exports = (env, argv) => {
    return webpackBaseConfig({
        env,
        argv,
        entry: {
            template: './src/index'
        },
        publicPath: '/template/',
        dist: '/template',
        port: 8999
    })
}
