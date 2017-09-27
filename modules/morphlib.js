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
import jquery from 'jquery';
window.jQuery = jquery;
window.$ = jquery
class morphlib {
    constructor(shortdefgrc){
        var xx = this;
        //Default Language the Alphieos Morphology library will use
        this.defaultlang = "";
        //Current Language the morphology library is using
        this.currentlang = "";
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
        //setup preferences from saved preference file
        this.prefs = new preferences("preferences.json");
        //previous morphology results
        this.morphresults = [];
        //short definitions for greek
        jQuery.getJSON("grc-lsj-defs.json", function (data) {
            xx.shortdefgreek = data;
        })
        //short definitions for persian
        jQuery.getJSON("per-stg-defs.json", function (data) {
            xx.shortdefpersian = data;
        })
        //short definitions for arabic
        jQuery.getJSON("ara-sal-ids.json", function (data) {
            xx.shortdefarabic = data;
        })
        //short definitions for latin
        this.shortdeflatin = false;
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
                    if(uilang.toUpperCase() === "Persian"){
                        this.defaultlang = "per";
                    } else {
                        window.alert("Language not installed please check spelling")
                    }
                }
            }
        }
        //var deflangwin = window.open("", "defaultLanguageWindow", "width=200,height=200,top=200,left=500");
        //deflangwin.document.write('<html><body><form><input type="radio" name="lang" value="lat" checked> Latin<br><input type="radio" name="lang" value="grc"> Greek<br><input type="radio" name="lang" value="ara"> Arabic<br><input type="radio" name="lang" value="per"> Persian<input type="submit" value="Submit"><br></form></body></html>');
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
