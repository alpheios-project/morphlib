/**
 * Created by Elijah Cooke on 7/28/2016.
 */
import babel from 'rollup-plugin-babel';
import bowerResolve from 'rollup-plugin-bower-resolve';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'modules/morphlib.js',
    plugins: [ 
      babel({
        exclude: [
          'bower_components/jquery/**',
          'node_modules/jquery/**',
        ]
      }),
      bowerResolve({
        skip: ['jquery'],
      }),
      nodeResolve({
          jsnext:true,
          main:true
      }),
      commonjs()
    ],
    moduleName: 'morphlibrary',
    targets: [
      { 
        dest: "build/js/alpheios-morphlib.js",
        useStrict: false,
        format: "iife"
      }
    ]
};
