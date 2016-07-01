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
class main = {
    //Default Language the Alphieos Morphology library will use
    m_defaultLang: "",
    //Holds the morphlib.response object
    m_response: "",
    //holds the location of the morphology provider
    m_morphService: "",
    //holds the locations of the short definition provider
    m_shortDefService: "",
    //holds the location of the disambugation provider
    m_disambugationProvider: "",
    //Copyright information
    m_copyrightInfo: "",
    //debugging setting
    m_debugging: false,
    //a list of element @id and @class values regions of the page to be ignored by the library
    m_ignoreElements:false,
    //a list of element @id and @class values the page to which to limit the activity of the library
    m_focusElements:false,

    //Initialize function for the class. Adds the even listener for to run morphlib when a page is loaded
    init: function()
    {
        window.addEventListener("load", this.onLoad, false);
    },

    /*
    TODO add check for dependencies
     */
    onLoad: function () {
        this.enable();
    },

    /*
    enables the library to run on a browser window
     */
    enable: function () {
        lang = false;
        //TODO check is lang is set if not detect
        trigger = "default"; //TODO add call the get from language tool so it can be langauge specfic
        this.setPopupTrigger(lang, trigger);
    },

    /*
    create listener to trigger the creation of the popup with the trigger supplied by the user config
     */
    setPopupTrigger: function (lang, trigger) {
        window.addEventListener(trigger, this.createPopup());
    },

    //Handler for the popup trigger event
    createPopup: function (event) {
        selction = window.getSelection()
        Popup.processText(event,selction);
    },

    //get the appropiate language tool
    getLanguageTool: function (elm) {
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
export main;