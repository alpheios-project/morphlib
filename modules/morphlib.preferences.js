/**
 * Created by Elijah Cooke on 7/12/2016.
 */
import {async} from "morphlib.async";
class preferences {
    constructor(prefFile) {
        //TODO add read in from preference file
    }
    setMouseAction (lang, newAction){
        if(mouseActions(lang)){

        }
    }

    getMouseAction (lang){
        return mouseActions(lang);
    }
}
export default preferences;