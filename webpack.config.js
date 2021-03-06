const path = require('path');

module.exports = {

  mode: 'development',

  entry: {
    main: path.resolve(__dirname, 'src', 'Ant.js'),
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3, "targets": "defaults" }], "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/i,
        // exclude: /(node_modules)/,
        use: [
            'style-loader', 
            {loader: 'css-loader', options: { importLoaders: 1 }}
        ]
      },
    ]
  },
  
};