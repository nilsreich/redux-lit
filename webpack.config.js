const path = require('path');
var Visualizer = require('webpack-visualizer-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './my-element.js',
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
  plugins: [new Visualizer({
    filename: './statistics.html'
  })]
};