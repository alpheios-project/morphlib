/**
 * Created by Elijah Cooke on 7/12/2016.
 */
class preferences {
    mouseActions = {}
    constructor(prefFile) {
        //TODO add read in from preference file
    }
    setMouseAction (lang, newAction){
        if(mouseActions(lang)){
            mouseActions(lang) 
        }
    }

    getMouseAction (lang){
        return mouseActions(lang);
    }
}
export default preferences;