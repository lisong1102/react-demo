import { Configuration } from "webpack";
import path from 'path'
import { merge } from "webpack-merge";
import baseConfig from "./webpack.base";
import CopyPlugin from "copy-webpack-plugin";
const prodConfig: Configuration = merge(baseConfig, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  //处理静态资源，不用经过编译，直接拷贝到对应的位置
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 复制public下文件
          to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
          filter: (source) => !source.includes("index.html"), // 忽略index.html
        },
      ],
    }),
  ],
});

export default prodConfig;
