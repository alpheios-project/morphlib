/**
 * Created by Elijah Cooke on 7/28/2016.
 */
import babel from 'rollup-plugin-babel';

export default {
    entry: 'modules/morphlib.main.js',
    plugins: [ 
      babel({exclude: 'node_modules/**'}) 
    ],
    moduleName: 'morphlib',
    targets: [
      { 
        dest: "build/js/bundle.js",
        format: "iife"
      }
    ]
};
