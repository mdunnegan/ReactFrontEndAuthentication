const webpack = require('webpack');

module.exports = {

  entry: [
    './src/index' // having a .js here will cause errors
  ],

  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/, 
        loaders: ['style', 'css']
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("development"),
      'process.env.ROOT_URL': JSON.stringify("http://localhost:3090/")
    })
  ]
};
