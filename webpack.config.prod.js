let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports={
    entry: {
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name]_[chunkhash:8].js"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                test:/\.(png|jpg|gif|jpeg)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:'img/[name]_[hash:8].[ext]'
                        }
                    }
                ]

            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new CleanWebpackPlugin()
    ]
};
