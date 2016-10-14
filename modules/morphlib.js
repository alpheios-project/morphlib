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
import preferences from "./preferences.js";
import eventhandler from "./Eventhandler.js";
import morphservice from "./morphservice.js";
import jQuery from 'jquery';
var $ = jQuery;
class morphlib {
    constructor(documentobj, shortdeflat, shortdefgre){
        var xx = this;
        //Default Language the Alphieos Morphology library will use
        this.defaultlang = "";
        //Current Language the morphology library is using
        this.currentlang = "";
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
        //setup preferences from saved preference file
        this.prefs = new preferences("preferences.json");
        //document object
        this.doc = documentobj;
        //previous morphology results
        this.morphresults = [];
        //short definitions for greek
        jQuery.getJSON("http://192.168.56.1:8888/sample/grc-lsj-defs.json", function (data) {
            xx.shortdefgreek = data;
        })
        //short definitions for latin
        this.shortdeflatin = shortdeflat;
    }
    /*
     activate the library to run on a browser window
     */
    activate (deflang, events) {
        var instance = this;
        if(this.prefs.getdebugstatus()){
            console.log("activate morphology library started");
        }
        this.defaultlang = deflang;
        this.currentlang = deflang;
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
                $('body').bind(x, function () {
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
            $('body').on('dblclick', '*', function () {
                var tokenobject = eventhandler(event, instance, "click");
                var morphresponse =morphservice(
                    tokenobject,
                    instance.prefs.getmorphservicetype(instance.currentlang),
                    instance.prefs.getmorphserviceuri(instance.currentlang),
                    instance.prefs.getmorphserviceapiformat(instance.currentlang),
                    instance.prefs.getmorphserviceversion(instance.currentlang),
                    instance);
            })
            $('body').on('touch', '*', function () {
                eventhandler(event, instance, "touch");
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
        $('body').unbind;
        alert("Morphology Library Deactivated")
        if(this.prefs.getdebugstatus()){
            console.log("Morphology library deactivated")
        }
    }

    currentLanguage (){
        return this.currentlang;
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
