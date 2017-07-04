/**
 * Created by Elijah Cooke on 6/28/2016.
 */

/**
 * Main controller function for the Alpheios morphology library
 * @type {{
 *      defaultLang: string,
 *      response: string,
 *      morphService: string,
 *      shortDefService: string,
 *      disambugationProvider: string,
 *      copyrightInfo: string,
 *      debugging: boolean,
 *      ignoreElements: list,
 *      focusElements: list
 *    }}
 */
import preferences from "./preferences.js";
import eventhandler from "./Eventhandler.js";
import morphservice from "./morphservice.js";
import jQuery from 'jquery';
class morphlib {
    constructor(prefsfile){
        var xx = this;
        //setup preferences
        if (prefsfile == "default") {
            //loads default preference values
            this.prefs == new preferences("default")
        } else {
            //loads user provided preferences file
            this.prefs = new preferences(prefsfile);
        }
        //Default Language the Alphieos Morphology library will use
        this.defaultlang = this.prefs.getdefaultlang();
        //Current Language the morphology library is using
        this.currentlang = this.prefs.getdefaultlang();
        //Holds the morphlib.response object
        this.response = "";
        //holds the name of the current morphology provider
        this.morphService = "";
        //holds the locations of the short definition provider
        this.shortDefService = "";
        //holds the location of the disambugation provider
        this.disambugationProvider = "";
        //Copyright information
        this.copyrightInfo = "";
        //Object to hold the current popup
        this.popup = false;
        //a list of element @id and @class values regions of the page to be ignored by the library
        this.ignoreElements = false;
        //a list of element @id and @class values the page to which to limit the activity of the library
        this.focusElements = false;


        //previous morphology results
        this.morphresults = [];
        //short definitions for greek
        if (this.prefs.getshortdeffile("grc")){
            jQuery.getJSON(this.prefs.getshortdeffile("grc"), function (data) {
                xx.shortdefgreek = data;
            })
        }
        //short definitions for persian
        if (this.prefs.getshortdeffile("per")){
            jQuery.getJSON(this.prefs.getshortdeffile("per"), function (data) {
                xx.shortdefpersian = data;
            })
        }
        //short definitions for arabic
        if (this.prefs.getshortdeffile("ara")){
            jQuery.getJSON(this.prefs.getshortdeffile("ara"), function (data) {
                xx.shortdefarabic = data;
            })
        }
        //short definitions for latin
        if (this.prefs.getshortdeffile("lat")){
            jQuery.getJSON(this.prefs.getshortdeffile("lat"), function (data) {
                xx.shortdeflatin = data;
            })
        }

    }
    /*
     activate the library to run on a browser window
     * @param {String} deflang - the default language
     * @param {Obj} selector - array of elements to attach event listeners to
     * @param {String[]} events = list of events to listen to
     */
    activate (deflang, selector, events) {
        var instance = this;
        if(this.prefs.getdebugstatus()){
            console.log("activate morphology library started");
        }
        this.selector = selector || $('body');
        if(this.prefs.getdebugstatus()){
            console.log("Adding default listener");
        }
        if(events){
            if(this.prefs.getdebugstatus()){
                console.log("Adding events");
            }
            for(var x in events){
                if(this.prefs.getdebugstatus()){
                    console.log("Adding " + x + "event");
                }
                $(this.selector).bind(x, function (event) {
                    eventhandler(event, this, x);
                });
                if(this.prefs.getdebugstatus()){
                    console.log(x + "event added");
                }
            }
        }
        else {
            if(this.prefs.getdebugstatus()){
                console.log("Adding default events (Click and Touch)");
                var bodydebug = $('body');
                console.log(bodydebug);
            }
            $(this.selector).on('dblclick', function (event) {
                var tokenobject = eventhandler(event, instance, "click");
                var morphresponse =morphservice(
                    tokenobject,
                    instance.prefs.getmorphservicetype(instance.currentlang),
                    instance.prefs.getmorphserviceuri(instance.currentlang),
                    instance.prefs.getmorphserviceapiformat(instance.currentlang),
                    instance.prefs.getmorphserviceversion(instance.currentlang),
                    instance);
            })
            $(this.selector).on('touch', function (event) {
                var tokenobject = eventhandler(event, instance, "touch");
                this.response =morphservice(
                    tokenobject,
                    instance.prefs.getmorphservicetype(instance.currentlang),
                    instance.prefs.getmorphserviceuri(instance.currentlang),
                    instance.prefs.getmorphserviceapiformat(instance.currentlang),
                    instance.prefs.getmorphserviceversion(instance.currentlang),
                    instance);
            })
            if(this.prefs.getdebugstatus()){
                console.log("Default events added");
            }
        }

        if(this.prefs.getdebugstatus()){
            console.log("morphology library activated")
        }
    }

    deactivate (){
        if(this.prefs.getdebugstatus()){
            console.log("Deactivating Morphology library")
        }
        $(this.selector).unbind();
        alert("Morphology Library Deactivated")
        if(this.prefs.getdebugstatus()){
            console.log("Morphology library deactivated")
        }
    }

    currentLanguage (){
        return this.currentlang;
    }

    deflangui (){
        var uilang = window.prompt("Enter the default language for the page");
        if(uilang.toUpperCase() === "LATIN"){
            this.defaultlang = "lat";
        } else {
            if(uilang.toUpperCase() === "GREEK"){
                this.defaultlang = "grc";
            } else {
                if(uilang.toUpperCase() === "ARABIC"){
                    this.defaultlang = "ara";
                } else {
                    if(uilang.toUpperCase() === "PERSIAN"){
                        this.defaultlang = "per";
                    } else {
                        window.alert("Language not installed please check spelling")
                    }
                }
            }
        }
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
export default morphlib;
