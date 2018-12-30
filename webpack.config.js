const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';
  return {

    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      proxy: {
        '/rpi-dht' : 'http://192.168.1.201:3000'
      },
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      host: '192.168.1.23',
      port: 8080
    }
  }
}

