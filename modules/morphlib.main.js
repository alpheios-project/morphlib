/**
 * Created by Elijah Cooke on 6/28/2016.
 */

/**
 * Main controller function for the Alpheios morphology library
 * @type {{
 *      m_defaultLang: string,
 *      m_response: string,
 *      m_morphService: string,
 *      m_shortDefService: string,
 *      m_disambugationProvider: string,
 *      m_copyrightInfo: string,
 *      m_debugging: boolean,
 *      m_ignoreElements: list,
 *      m_focusElements: list
 *    }}
 */
import * as Popup from "morphlib.popup";
import * as Util from "morphlib.util"
class main {
    constructor(){
        //Default Language the Alphieos Morphology library will use
        this.defaultLang = "";
        //Holds the morphlib.response object
        this.response = "";
        //holds the location of the morphology provider
        this.morphService = "";
        //holds the locations of the short definition provider
        this.shortDefService = "";
        //holds the location of the disambugation provider
        this.disambugationProvider = "";
        //Copyright information
        this.copyrightInfo = "";
        //a list of element @id and @class values regions of the page to be ignored by the library
        this.ignoreElements = false;
        //a list of element @id and @class values the page to which to limit the activity of the library
        this.focusElements = false;
    }


    //Initialize function for the class. Adds the even listener for to run morphlib when a page is loaded
    init()
    {
        window.addEventListener("load", this.onLoad, false);
    }

    /*
    TODO add check for dependencies
     */
    onload () {
        this.enable();
    }

    /*
    enables the library to run on a browser window
     */
    enable () {
        lang = false;
        //TODO check is lang is set if not detect
        trigger = "default"; //TODO add call the get from language tool so it can be langauge specfic
        this.setPopupTrigger(lang, trigger);
    }

    /*
    create listener to trigger the creation of the popup with the trigger supplied by the user config
     */
    setPopupTrigger (lang, trigger) {
        window.addEventListener(trigger, this.createPopup());
    }

    //Handler for the popup trigger event
    createPopup (event) {
        selction = window.getSelection()
        Popup.processText(event,selction);
    }

    //get the appropiate language tool
    getLanguageTool (elm) {
        var langTool;
        var langKey;
        if(elm){
            langKey = util.getLanguageforElement(elm);
        }
        if(!langKey){
            langKey = m_defaultLang;
        }
        if(langKey){
            langTool = languages.getLanguageToolfromKey()
        }
    }
}
export default main;