import { Configuration, DefinePlugin } from "webpack";
const path = require("path");
import HtmlWebpackPlugin from "html-webpack-plugin";

const envConfig ='ss'
const baseConfig: Configuration = {
    entry: path.join(__dirname, "../src/index.tsx"), //入口文件
    output: {
        filename: "static/js/[name].js", // 每个输出js的名称
        path: path.join(__dirname, "../dist"), //打包輸出地址
        clean: true, //webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: "/", // 打包后文件的公共前缀路径
    },
    //loader配置
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                // 着webpack做的事情越来越多，会逐渐变得很庞大，我们可以将其中的babel-loader相关的配置抽离出来进行管理，在根目录新建babel.config.js
                // use: {
                //     loader: "babel-loader",
                //     // 预设执行顺序由右往左,所以先处理ts,再处理jsx
                //     options: {
                //         presets: [
                //             [
                //                 "@babel/preset-env",
                //                 {
                //                     // 设置兼容目标浏览器版本,也可以在根目录配置.browserslistrc文件,babel-loader会自动寻找上面配置好的文件.browserslistrc
                //                     targets: {
                //                         browsers: [
                //                             "> 1%",
                //                             "last 2 versions",
                //                             "not ie <= 8",
                //                         ],
                //                     },
                //                     useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                //                     corejs: 3, // 配置使用core-js使用的版本
                //                     loose: true,
                //                 },
                //             ],
                //             // 如果您使用的是 Babel 和 React 17，您可能需要将 "runtime": "automatic" 添加到配置中。
                //             // 否则可能会出现错误：Uncaught ReferenceError: React is not defined
                //             ["@babel/preset-react", { runtime: "automatic" }],
                //             "@babel/preset-typescript",
                //         ],
                //     },
                // },
                use: "babel-loader",
            },
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    // plugins 的配置
    plugins: [
        //初始
        // new HtmlWebpackPlugin({
        //     // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
        //     template: path.join(__dirname, "../public/index.html"),
        //     // 压缩html资源
        //     minify: {
        //         collapseWhitespace: true, //去空格
        //         removeComments: true, // 去注释
        //     },
        // }),
        //修改后
        new HtmlWebpackPlugin({
            title: "webpack5-react-ts",
            filename: "index.html",
            // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
            template: path.join(__dirname, "../public/index.html"),
            // inject: true, // 自动注入静态资源
            hash: true,
            cache: false,
            // 压缩html资源
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true, //去空格
                removeComments: true, // 去注释
                minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                minifyCSS: true, // 缩小CSS样式元素和样式属性
            },
            nodeModules: path.resolve(__dirname, "../node_modules"),
        }),


        // new DefinePlugin({
        //     "process.env": JSON.stringify(envConfig.parsed),
        //     "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
        //     "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        //   }),
      
    ],
};

export default baseConfig;
