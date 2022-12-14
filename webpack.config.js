const path = require('path')
const webpack = require('webpack')
const CssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, argv) => {
    // const nodeEnv = process.env.NODE_ENV || 'dev'
    // const envPrefix = env && env.prefix ? env.prefix : nodeEnv

    // 腾讯环境开发
    // const envDomain = env && env.domain ? env.domain : 'static.devops.o.qcloud.com'

    // 嘉为环境开发
    // const envDomain = env && env.domain ? env.domain : 'static.devops.corp.hq.csg'

    // bkci环境开发
    const envDomain = env && env.domain ? env.domain : 'bkci-ee.bk.tencent.com'

    // 静态资源访问路径
    // const publicPath = `http://${envDomain}/teamwork/`

    // 腾讯打包
    // const publicPath = `http://${envPrefix === 'master' ? '' : `${envPrefix}.`}${envDomain}/teamwork/`
    const publicPath = `http://${envDomain}/plugin/`

    // const isMaster = envPrefix === 'master'
    return {
        entry: {
            'index': './src/index'
        },
        output: {
            publicPath,
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    include: path.resolve('src'),
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    include: path.resolve('src'),
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.css/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    exclude: [
                        path.resolve(__dirname, './src/images/svg'), // 排除字体图标文件
                        path.resolve(__dirname, './src/images/svg/types')
                    ]
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "style-loader" 
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader" 
                    }]
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.HashedModuleIdsPlugin(),
            new CssExtractPlugin({
                filename: '[name].css',
                chunkName: '[id].css'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin()
        ],
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve('src'),
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex'
        },
        optimization: {
            namedChunks: true
        },

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            historyApiFallback: true,
            noInfo: false,
            disableHostCheck: true,
            port: 8020,
            hot: true
        },
        devtool: process.env.NODE_ENV === 'dev' ? 'cheap-module-eval-source-map' : 'none',
    }
}
