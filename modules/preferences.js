/**
 * Created by Elijah Cooke on 7/12/2016.
 * test
 */
import {async} from "./async.js";
import {createjsonobj} from "./util.js"
class preferences {
    constructor(prefFile) {
        this.prefsobj = {
            "debug": [true],
            "languages":[
                {"currentlang":"gre"},
                {"defaultlang":"gre"},
                {"installedlangs":[
                    {"lang":"greek", "code":"gre", "mouseaction":"onclick"},
                    {"lang":"latin", "code":"lat", "mouseaction":"onclick"}
                ]}
            ]

        }
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
        //placeholder till preference class is fixed
        return true;
        //return prefsobj.debug
    }
}
export default preferences;
