const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './js/index.js'
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: resolve(__dirname, 'build')
    },
    devtool: '#eval-source-map',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: false,
        port: 8080,
        host: '0.0.0.0',
        hot: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader?{"presets":["es2015"],"plugins": ["transform-object-rest-spread"]}',
                            css: 'vue-style-loader!css-loader'
                        }
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015'],
                            plugins: ['transform-object-rest-spread']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png)$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.vue'
        ],
        alias: {
            vue: resolve(__dirname, 'node_modules', 'vue', 'dist', 'vue.min.js')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'index.html_vm',
            favicon: 'img/favicon.ico',
            hash: false
        })
    ]
};