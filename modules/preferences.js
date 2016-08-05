/**
 * Created by Elijah Cooke on 7/12/2016.
 * test
 */
import {async} from "./async.js";
import {createjsonobj} from "./util.js"
class preferences {
    constructor(prefFile) {
        this.prefsobj = createjsonobj(prefFile);
    }

    setMouseAction (lang, newAction){
        installedlangs = prefsobj.languages[2];
        for(var intlang in installedlangs["installedlangs"]){
            if(installedlangs["installedlangs"][intlang]["code"]==lang){
                installedlangs["installedlangs"][intlang]["mouseaction"] == newAction;
            }
        }
    }

    getMouseAction (lang){
        installedlangs = prefsobj.languages[2];
        for(var intlang in installedlangs["installedlangs"]){
            if(installedlangs["installedlangs"][intlang]["code"]==lang){
                return installedlangs["installedlangs"][intlang]["mouseaction"];
            }
        }
    }
    getdebugstatus(){
        return prefsobj.debug
    }
}
export default preferences;
