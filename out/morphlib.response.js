"use strict";

/**
 * Created by Elijah Cooke on 6/28/2016.
 *
 * Class that represents the response object and contains the different method to generate the different kinds of responses
 */
/**
 * Global namespace
 * @type {{}}
 */
var morphlib = morphlib || {};

/**
 * Response object that has all the property required in a response and the functions to generate that response
 * @type {{dicHeadWords: string,
 *      shortDfinitions: string,
 *      pofs: string,
 *      inflAtrib: string,
 *      source: string,
 *      copyright: string,
 *      misc: string,
 *      links: string,
 *      getHTML: morphlib.response.getHTML,
 *      getJSON: morphlib.response.getJSON}}
 */
morphlib.response = {
    //Dictionary headwords (lemmas)
    dicHeadWords: "",
    //Short definitions
    shortDfinitions: "",
    //parts of speech
    pofs: "",
    //inflection attributes (per alpheios lexicon schema)
    inflAtrib: "",
    //source information
    source: "",
    //copyright information
    copyright: "",
    // notes and extra data
    misc: "",
    //related links
    links: "",

    //methods for response object
    /**
     * Function for generating a HTML fragment representation of response object
     * @returns {HTML fragment}
     */
    getHTML: function getHTML() {
        htmlFrag = '<div class="morphlib-response"><div class="morphlib-dicHeadWords">' + dicHeadWords + '</div></div>';
        return htmlFrag;
    },
    /**
     * Function for generating a JSON object representation of response object
     * @returns {JSON object}
     */
    getJSON: function getJSON() {
        jsonObj = { "response": [{
                "dicHeadwords": dicHeadWords,
                "shortDfinitions": shortDfinitions,
                "pofs": pofs,
                "inflAtrib": inflAtrib,
                "source": source,
                "copyright": copyright,
                "misc": misc,
                "links": links
            }] };
        return jsonObj;
    }
};