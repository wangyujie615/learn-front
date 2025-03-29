const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//添加环境变量
const Dotenv = require('dotenv-webpack')
module.exports = {
    // 入口文件
    entry: "./src/index.js",
    // 输出配置
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chunk.js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    //配置loader
    module: {
        rules: [
            {   //配置css loader
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                //配置读取图片
                test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                //配置babel
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ],
    },
    //配置插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),
        new Dotenv()
    ],
    //设置webpack server配置
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        hot: true, // 热模块替换
        open: true,
        port: 8080,
    },
    resolve: {
        extensions: ['.js', 'jsx']
    },
    //设置模式
    mode: "development",
    //开发工具配置
    devtool: "inline-source-map",
    //优化配置
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
