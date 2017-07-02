const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {  
  devtool: 'source-map',

  entry: [
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/', // with/without trailing / ?
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { 
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, 
        loaders: ['style-loader', 'css-loader']
      },
      { 
        test: /\.wav$/,
        loader: 'file-loader' 
      }
    ]
  },

  plugins: [
    // uglification and minification can happen with the webpack -p flag
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production'),
    //     'ROOT_URL': JSON.stringify('https://dry-thicket-16915.herokuapp.com/')
    //   }
    // })
    //extractPlugin
  ]
};