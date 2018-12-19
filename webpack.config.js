const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './my-element.ts',
  devtool: 'inline-source-map',
  devServer: {
  contentBase: './dist'
   },
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
          title: 'Development'
        })
      ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'my-element.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
        new TerserPlugin({
        terserOptions: {
          ecma: 8,
          warnings: false,
          parse: {},
          compress: {
            arrows: true,
            arguments:true,
            booleans_as_integers:true,
            drop_console:true,
            expression:true,
            hoist_funs:true,
            hoist_vars:true,
            inline:true,
            module:true,
            passes:3,
            pure_getters:true,
            unsafe_arrows:true,
            unsafe_comps:true,
            unsafe_math:true,
            unsafe_Function:true,
            unsafe_methods:true,
            unsafe_proto:true,
            unsafe_regexp:true,
            unsafe_undefined:true
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: true,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: false,
          keep_fnames: false,
          safari10: false
        }
      })]
  },
  plugins: []
};