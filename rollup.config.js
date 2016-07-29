/**
 * Created by Elijah Cooke on 7/28/2016.
 */
import babel from 'rollup-plugin-babel';

export default {
    entry: 'out/morphlib.main.js',
    format: 'cjs',
    plugins: [ babel() ],
    dest: 'bundle.js'
};