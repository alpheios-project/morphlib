/**
 * Created by Elijah Cooke on 7/28/2016.
 */
import babel from 'rollup-plugin-babel';

export default {
    entry: 'modules/morphlib.js',
    plugins: [ 
      babel({})
    ],
    moduleName: 'morphlibrary',
    targets: [
      { 
        dest: "build/js/alpheios-morphlib.js",
        format: "iife"
      }
    ]
};
