/**
 * Created by Elijah Cooke on 6/28/2016.
 *
 * Class that represents the response object and contains the different method to generate the different kinds of responses
 */
/**
 * Global namespace
 * @type {{}}
 */

export class tokenresponse {
    //constructor for response of token object that event handler creates
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

export class morphresponse {
    //constructor for response of parsed morphology object that morphology parser returns
    constructor(originform, objects, isordered, credit){
        // the original analyzed form
        this.originalform = originform;
        // list of analysis objects
        this.analysisobjects = objects
        // boolean which tells whether the analysis objects are ordered or not
        this.ordered = isordered;
        //credits
        this.credits = credit
    }
}

export class analysisresponse {
    //constructor for response object for the analysis a morphology service provides
    constructor(hdwd, pofs, shortdef, posinfl, ordinfl){
        // the lemma or head word
        this.lemma = hdwd;
        // part of speech
        this.partofspeech = pofs;
        // short definition if it exists
        this.shortdefinition = shortdef;
        // list of possible inflections
        this.inflections = posinfl;
        // boolean that tell whether the inflections are ordered
        this.orderedinfls = ordinfl;
    }
}