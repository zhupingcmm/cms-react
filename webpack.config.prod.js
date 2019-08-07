let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BuildAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const smp = new SpeedMeasurePlugin();

const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports={
    entry: {
        index:'./www/index.js',
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name].js"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: "thread-loader",
                        options: {
                            workers:3
                        }
                    },
                    'babel-loader'
                ]
            },
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            //sourceMap: true,
                            outputStyle: 'compressed',
                            includePaths: [
                                './node_modules',
                                './node_modules/@micro-focus',
                            ],
                        },
                    },
                ],
            },
            {
                test:/\.(png|jpg|gif|jpegeot|woff|woff2|svg|ttf|eot)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name:'img/[name][hash:8].[ext]',
                            limit:1024 * 8
                        }
                    }
                ]

            }

        ]
    },
    resolve: {
        extensions: ['.js', '.scss', '.css', '.json'],
        modules: [path.resolve(__dirname, 'www'), 'node_modules', 'node_modules/@micro-focus'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./www/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkName:'[id].css'
        }),
        //new BuildAnalyzerPlugin(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new optimizeCssAssetsWebpackPlugin()
        ],
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },

            }
        }
    },
};
