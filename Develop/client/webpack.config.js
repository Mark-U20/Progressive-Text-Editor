const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const is_prod = process.env.NODE_ENV === 'production';


// TODO: Add and configure workbox plugins for a service worker and manifest file.
const plugins = [
  new HtmlWebpackPlugin({
    title: 'Webpack App',
    filename: 'index.html',
    template: path.join(__dirname, 'index.html'),
    favicon: path.join(__dirname, '/favicon.ico'),
  }),
  new WebpackPwaManifest({
    name: 'My Progressive Web App',
    short_name: 'MyPWA',
    description: 'My awesome Progressive Web App!',
    start_url: './',
    publicPath: './',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    favicon: './src/assets/favicon.png',
    icons: [
      {
        src: path.resolve(__dirname, 'src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },

      
    ]

  }),
  new MiniCssExtractPlugin({
    filename: is_prod ? 'style.[contenthash].css' : 'style.css'

  }),
  new GenerateSW(),
  new InjectManifest({
    swSrc: './src-sw.js',
  })

]
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name][contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      hot: true,
      watchFiles: ['./src/index.html'],
      proxy: {
        '/': 'http://localhost:3333'
      }
    },
    plugins: plugins,
    module: {
      rules: [
        {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use:{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          }
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
            }
          ]
              
        }
      ],
    },
   
  };
};
