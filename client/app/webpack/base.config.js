import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const cssExtractor = new ExtractTextPlugin('assets/webpack-client.css');

const CSS_LOADER_LIST = [
  'style',
  'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss',
];

export default {
  context: path.resolve(__dirname, '../'),
  entry: [
    path.resolve(__dirname, '../scripts/client.js'),
  ],
  output: {
    path: path.resolve(__dirname, '../build/'),
    filename: 'assets/client.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin('NODE_ENV'),
    new webpack.EnvironmentPlugin('DOMAIN_ENV'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      temp: '<%= wsPort %>',
    }),
    cssExtractor,
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        loader: cssExtractor.extract(CSS_LOADER_LIST[0], CSS_LOADER_LIST.slice(1).join('!'), { publicPath: '/' }),
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff&name=./assets/[name].[ext]' },
      { test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff&name=./assets/[name].[ext]' },
      { test: /\.svg\?v=[0-9]\.[0-9]\.[0-9]$/, loaders: ['url?limit=10000&minetype=application/font-woff', 'img']},
      { test: /\.(svg|png|jpg|jpeg)$/, loaders: ['url?limit=10000&name=./assets/[name].[ext]']},
      { test: /\.json$/, loaders: ['json']},
    ],
  },
  postcss() {
    return [autoprefixer];
  },
};
