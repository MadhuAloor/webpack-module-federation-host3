import path from "path";
import { Configuration, container} from "webpack";
import {CleanWebpackPlugin} from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

export const baseConfig: Configuration = {
  entry: {
    main: './src/index.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: '@teamsupercell/typings-for-css-modules-loader',
            options: {
              formatter: 'prettier',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {test: /\.ts*/, use: 'ts-loader'},
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new container.ModuleFederationPlugin({
      name: "app3",
      library: { type: "var", name: "app3" },
      filename: "remoteEntry.js",
      remotes: {
        app2: "app2",
        app3: "app3"
      },
      exposes: {
        'App': './src/App'
      },
      shared: ["react", "react-dom","react-router-dom"]
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  }
}