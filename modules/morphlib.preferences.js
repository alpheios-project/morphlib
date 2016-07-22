/**
 * Created by Elijah Cooke on 7/12/2016.
 */
import {async} from "morphlib.async";
class preferences {
    constructor(prefFile) {
        prefdata = async("GET", prefFile, {"type":"text"});
        prefs = JSON.parse(prefdata);
    }

    setMouseAction (lang, newAction){
        if(mouseActions(lang)){
            installedlangs = prefs.languages[2];
            for(var lang in installedlangs){
                
            }
        }
    }

    getMouseAction (lang){
        return mouseActions(lang);
    }
}
export default preferences;