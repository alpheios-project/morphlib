/**
 * Created by Elijah Cooke on 7/12/2016.
 * test
 */
    
class preferences {
    constructor(prefFile) {
        var xx = this
        //intializes preference object with default values
        if (prefFile == "default"){
            this.currentprefs = {
                "installedlangs" : {
                    "grc": {
                        "servicetype":"remote",
                        "uri":"http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=grc&engine=morpheusgrc&word=",
                        "format":"alpheios",
                        "mouseaction":"dblclick",
                        "shortdeffile":"https://rawgit.com/alpheios-project/morphlib/master/sample/grc-lsj-defs.json",
                        "version":"placeholder"//future feature

                    },
                    "lat":{
                        "servicetype":"remote",
                        "uri":"http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=lat&engine=whitakerLat&word=",
                        "format":"ww",
                        "mouseaction":"dblclick",
                        "shortdeffile":false,
                        "version":"placeholder"//future feature
                    },
                    "per":{
                        "servicetype":"remote",
                        "uri":["http://services.perseids.org/pysvc/morphologyservice/analysis/word?word=","&lang=per&engine=hazm"],
                        "format":"alpheios",
                        "mouseaction":"dblclick",
                        "shortdeffile":"https://rawgit.com/alpheios-project/morphlib/master/sample/per-stg-defs.json",
                        "version":"placeholder"//future feature
                    },
                    "ara":{
                        "servicetype":"remote",
                        "uri":"http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=ara&engine=aramorph&word=",
                        "format":"alpheios",
                        "mouseaction":"dblclick",
                        "shortdeffile":"https://rawgit.com/alpheios-project/morphlib/master/sample/ara-sal-ids.json",
                        "version":"placeholder"//future feature
                    }
                },
                "debugstatus":true,
                "mouseaction":"onclick",
                "defaultlang":false
            }
        } else {
            jQuery.getJSON(prefFile, function (data) {
                xx.currentprefs = data;
            })
        }
    }

    getdefaultlang(){
        return this.currentprefs["defaultlang"];
    }

    getshortdeffile(lang){
        return this.currentprefs["installedlangs"][lang]["shortdeffile"]
    }

    setMouseAction (lang, newAction){
        this.currentprefs["installedlangs"][lang]["mouseaction"] = newAction;
        return
    }

    getMouseAction (lang){
        return this.currentprefs["installedlangs"][lang]["mouseaction"]
    }
    getdebugstatus(){
        return this.currentprefs["debugstatus"];
    }
    getmorphservicetype(lang){
        return this.currentprefs["installedlangs"][lang]["servicetype"]
    }
    getmorphserviceuri(lang){
        return this.currentprefs["installedlangs"][lang]["uri"]
    }
    getmorphserviceapiformat(lang){
        return this.currentprefs["installedlangs"][lang]["format"]
    }
    getmorphserviceversion(lang){
        return this.currentprefs["installedlangs"][lang]["version"]
    }
}
export default preferences;
