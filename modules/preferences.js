/**
 * Created by Elijah Cooke on 7/12/2016.
 * test
 */
    
class preferences {
    constructor(prefFile) {

    }

    getcurretlang(){
        
    }

    setMouseAction (lang, newAction){
        var installedlangs = prefsobj.languages[2];
        for(var intlang in installedlangs["installedlangs"]){
            if(installedlangs["installedlangs"][intlang]["code"]==lang){
                installedlangs["installedlangs"][intlang]["mouseaction"] == newAction;
            }
        }
    }

    getMouseAction (lang){
        var installedlangs = prefsobj.languages[2];
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
        if(lang == "grc"){
            return "remote";
        }
        if(lang == "lat"){
            return "remote";
        }
    }
    getmorphservicetype(lang){
        if(lang == "grc"){
            return "remote";
        }
        if(lang == "lat"){
            return "remote";
        }
    }
    getmorphserviceuri(lang){
        if(lang == "grc"){
            return "http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=grc&engine=morpheusgrc&word=";
        }
        if(lang == "lat"){
            return "http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=lat&engine=whitakerLat&word=";
        }
    }
    getmorphserviceapiformat(lang){
        if(lang == "grc"){
            return "alpheios";
        }
        if(lang == "lat"){
            return "ww";
        }
    }
    getmorphserviceversion(lang){
    if(lang == "grc"){
        return "placeholder";
    }
    if(lang == "lat"){
        return "placeholder";
    }
}
}
export default preferences;
