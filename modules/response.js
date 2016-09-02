/**
 * Created by Elijah Cooke on 6/28/2016.
 *
 * Class that represents the response object and contains the different method to generate the different kinds of responses
 */
/**
 * Global namespace
 * @type {{}}
 */

class response {
    //constructor for response object
    constructor(word, bcontext, fcontext, wordlang, textdir) {
        //Selected Token from triggered event
        this.selectedtoken= word;
        //Backwards context for selected token
        this.backwardcontext= bcontext;
        //forward context for selected token
        this.forwardcontext= fcontext;
        //language for selected token
        this.lang= wordlang;
        //text direction for selected token
        this.textdirection= textdir;
    }
}

export default response