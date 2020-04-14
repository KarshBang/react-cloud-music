const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webPack = require('webpack')
module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.js',
        // sub: './src/index.js',
    },
    output: {
        //发布的静态资源地址(html里src的前缀)
        // publicPath: 'http://cdn.com/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: "babel-loader",
            },
            {
                test: /\.jpg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        //placeholder 占位符语法
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        limit: 2048
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    // 'css-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //在css文件中,用import导入的模块,会先用下面的1个loader(此处为postcss-loader)处理
                            importLoaders: 1,
                            //可以模块化使用css
                            // modules: true
                        }
                    },
                    //css兼容性loader
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webPack.HotModuleReplacementPlugin()
    ],
    mode: 'development', 
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        open: true,
        hot: true,
        useLocalIp: true
        // hotOnly: true
    }
}