const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client', '/App.jsx'),
  // __dirname + '/client/App.jsx'
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-react', '@babel/preset-env']
          // }
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public'),
  },
};
