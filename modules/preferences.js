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
        if(lang == "per"){
            return "remote";
        }
        if(lang == "ara"){
            return "remote";
        }
    }
    getmorphserviceuri(lang){
        if(lang == "grc"){
            return "https://morph.perseids.org/analysis/word?lang=grc&engine=morpheusgrc&word=";
        }
        if(lang == "lat"){
            return "https://morph.perseids.org/analysis/word?lang=lat&engine=whitakerLat&word=";
        }
        if(lang == "ara"){
            return "https://morph.alpheios.net/api/v1/analysis/word?lang=ara&engine=aramorph&word=";
        }
        if(lang == "per"){
            return ["https://morph.perseids.org/analysis/word?word=","&lang=per&engine=hazm"];
        }
    }
    getmorphserviceapiformat(lang){
        if(lang == "grc"){
            return "alpheios";
        }
        if(lang == "lat"){
            return "ww";
        }
        if(lang == "ara"){
            return "alpheios";
        }
        if(lang == "per"){
            return "alpheios";
        }
    }
    getmorphserviceversion(lang){
        if(lang == "grc"){
            return "placeholder";
        }
        if(lang == "lat"){
        return "placeholder";
        }
        if(lang == "ara"){
            return "placeholder";
        }
        if(lang == "per"){
            return "placeholder";
        }
    }
}
export default preferences;
