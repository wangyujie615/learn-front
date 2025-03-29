# 手动搭建的React项目
## 简介
手动单间的react项目; 手动配置webpack,配置loader
## 相关步骤
1. 项目初始化

```javascript
npm init -y
npm init
```

2. 安装`webpack`

```javascript
pnpm install webpack webpack-cli --save-dev
```

3. 创建`webpack`配置文件

```javascript
const path = require('path')

module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 输出配置
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    //开发模式
    mode: 'development',
    //开发工具配置
    devtool: 'inline-source-map'
}
```

4. 处理`CSS`---配置`css loader`

```javascript
1.安装 
pnpm add --save-dev style-loader css-loader 
2.添加配置
module: {
        rules: [
            {   //配置css loader
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
}
```

5. 处理图片资源

```javascript
1.安装对应的loader
pnpm add --save-dev file-loader
2.配置loader
module: {
        rules: [
            {   //配置css loader
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
}
```

6. 配置`babel`

```javascript
1.安装对应的loader
pnpm add babel-loader --save-dev babel-loader @babel/core @babel/preset-env 
2.配置loader
module: {
        rules: [
            {   //配置css loader
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
}
```

7. 配置开发服务器

```javascript
1.安装依赖
pnpm add --save-dev webpack-dev-server
2.配置
module: {
        devServer: {
          static: './dist',
          hot: true, // 热模块替换
          open: true, // 自动打开浏览器
          port: 8080, // 自定义端口
        },
        rules: [
            {   //配置css loader
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
}
3.设置命令
"scripts": {
  "start": "webpack serve --open",
  "build": "webpack"
}
```

8. 配置`HTML`模板插件

```javascript
1.安装插件
pnpm add --save-dev html-webpack-plugin clean-webpack-plugin
2.配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [
  new HtmlWebpackPlugin({
    title: '我的应用',
    template: './src/index.html'
  }),
  new CleanWebpackPlugin(),
],
```

9. 整体配置

```javascript
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    // 入口文件
    entry: "./src/index.js",
    // 输出配置
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    //配置loader
    module: {
        rules: [
            {   //配置css loader
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                //配置读取图片
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                //配置babel
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ],
    },
    //配置插件
    plugins: [
        new HtmlWebpackPlugin({
            title: 'test',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    //设置webpack server配置
    devServer: {
        static: './dist',
        hot: true, // 热模块替换
        open: true,
        port: 8080,
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

```