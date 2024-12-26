import path from 'path';
import { fileURLToPath } from 'url';

import { defaultGetLocalIdent } from 'css-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error('Unknown bundler');
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: 'development',
  devtool: false,
  entry: {
    main: './src/index',
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                namedExport: true,
                exportGlobals: false,
                exportLocalsConvention: 'camelCase',
                localIdentName: '[path][name]__[local]-[hash:base64:6]',
              },
            },
          },
        ],
        type: 'javascript/auto',
      },
    ],
  },
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, 'webpack-dist')
      : path.resolve(__dirname, 'rspack-dist'),
    filename: '[name].js',
  },
  experiments: {
    css: true,
  },
};

export default config;
