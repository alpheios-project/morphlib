/**
 * Created by Elijah Cooke on 7/12/2016.
 * test
 */
import jQuery from 'jquery';

class preferences {
    constructor(prefFile) {

    }

    getcurretlang(){
        
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
    getmorphservicetype(lang){
        if(lang == "gre"){
            return "remote";
        }
        if(lang == "lat"){
            return "remote";
        }
    }
    getmorphservicetype(lang){
        if(lang == "gre"){
            return "remote";
        }
        if(lang == "lat"){
            return "remote";
        }
    }
    getmorphserviceuri(lang){
        if(lang == "gre"){
            return "http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=grc&engine=morpheusgrc&word=";
        }
        if(lang == "lat"){
            return "http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=lat&engine=whitakerLat&word=";
        }
    }
    getmorphserviceapiformat(lang){
        if(lang == "gre"){
            return "alpheios";
        }
        if(lang == "lat"){
            return "ww";
        }
    }
    getmorphserviceversion(lang){
    if(lang == "gre"){
        return "placeholder";
    }
    if(lang == "lat"){
        return "placeholder";
    }
}
}
export default preferences;
