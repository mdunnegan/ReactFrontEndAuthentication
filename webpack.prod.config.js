const path = require('path')  
const webpack = require('webpack')

module.exports = {  
  devtool: 'source-map',

  entry: [
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  plugins: [
    // uglification and minification can happen with the webpack -p flag
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'ROOT_URL': JSON.stringify('https://dry-thicket-16915.herokuapp.com/')
      }
    })
  ],

  module: {
    loaders: [
      { 
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'src', 'styles') 
      },
      { 
        test: /\.png$/,
        loader: 'file' 
      },
      { 
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      }
    ]
  }
}