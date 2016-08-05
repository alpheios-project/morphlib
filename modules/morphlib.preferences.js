/**
 * Created by Elijah Cooke on 7/12/2016.
 * test
 */
import {async} from "./async.js";
class preferences {
    constructor(prefFile) {
        var prefdata = async("GET", prefFile, {"type":"text"});
        prefs = JSON.parse(prefdata);
    }

    setMouseAction (lang, newAction){
        installedlangs = prefs.languages[2];
        for(var intlang in installedlangs["installedlangs"]){
            if(installedlangs["installedlangs"][intlang]["code"]==lang){
                installedlangs["installedlangs"][intlang]["mouseaction"] == newAction;
            }
        }
    }

    getMouseAction (lang){
        installedlangs = prefs.languages[2];
        for(var intlang in installedlangs["installedlangs"]){
            if(installedlangs["installedlangs"][intlang]["code"]==lang){
                return installedlangs["installedlangs"][intlang]["mouseaction"];
            }
        }
    }
    getdebugstatus(){
        return prefs.debug
    }
}
export default preferences;
