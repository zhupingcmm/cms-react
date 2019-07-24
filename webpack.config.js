let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports={
    entry: {
        index:'./www/index.js',
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name].js"
    },
    devtool: "inline-source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // {
            //     test:/\.(png|jpg|gif|jpeg)/,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 limit:1024
            //             }
            //         }
            //     ]
            //
            // },

            {
                test:/\.(png|jpg|gif|jpegeot|woff|woff2|svg|ttf|eot)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name:'img/[name][hash:8].[ext]'
                        }
                    }
                ]

            }

        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./www/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase:'./dist',
        hot:true,
        port:4000,
        open:true
    }
};
