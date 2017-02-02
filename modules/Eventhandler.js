/**
 * Created by Elijah Cooke on 8/30/2016.
 */
import * as main from "./morphlib"
import {tokenresponse} from "./response.js";
import jQuery from 'jquery';
export default function eventhandler(event, instance, trigger) {
    if(instance.prefs.getdebugstatus()){
        console.log("Event Triggered")
    }
    var elementlang;
    if(event.target.attributes["id"]){
        var jqid = "#"+event.target.attributes["id"].nodeValue;
    } else {
        var jqid = false;
    }

    if(event.target.attributes["xml:lang"]){
        elementlang = event.target.attributes["xml:lang"].nodeValue;
        if(elementlang == 'lat'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as latin, lang taken from element")
            }
            return processwordlat(event.target, instance);
        }
        if(elementlang == 'grc'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as Greek, lang taken from element")
            }
            return processwordgrc(event.target, instance);
        }
        if(elementlang == 'ara'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as Arabic, lang taken from element")
            }
            return processwordara(event.target, instance);
        }
        if(elementlang == 'per'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as Persian, lang taken from element")
            }
            return processwordper(event.target, instance);
        }
        console.log("Language not installed")
    } else if (jqid){
        if($(jqid).parents("[xml\\:lang]")){
            elementlang = $(jqid).parents("[xml\\:lang]")[0].attributes["xml:lang"].nodeValue;
            if(elementlang == 'lat'){
                if(instance.prefs.getdebugstatus()){
                    console.log("Running word as latin, lang taken from ancestor element")
                }
                return processwordlat(event.target, instance);
            }
            if(elementlang == 'grc'){
                if(instance.prefs.getdebugstatus()){
                    console.log("Running word as Greek, lang taken from ancestor element")
                }
                return processwordgrc(event.target, instance);
            }
            if(elementlang == 'ara'){
                if(instance.prefs.getdebugstatus()){
                    console.log("Running word as Arabic, lang taken from ancestor element")
                }
                return processwordara(event.target, instance);
            }
            if(elementlang == 'per'){
                if(instance.prefs.getdebugstatus()){
                    console.log("Running word as Persian, lang taken from ancestor element")
                }
                return processwordper(event.target, instance);
            }
            console.log("Language not installed")
        }
    } else if (event.target.parentNode.attributes["id"]){
        elementlang = event.target.parentNode.attributes["id"].nodeValue;
        if(elementlang == 'lat'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as latin, lang taken from element")
            }
            return processwordlat(event.target, instance);
        }
        if(elementlang == 'grc'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as Greek, lang taken from element")
            }
            return processwordgrc(event.target, instance);
        }
        if(elementlang == 'ara'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as Arabic, lang taken from element")
            }
            return processwordara(event.target, instance);
        }
        if(elementlang == 'per'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as Persian, lang taken from element")
            }
            return processwordper(event.target, instance);
        }
        console.log("Language not installed")
    } else {
            elementlang = instance.defaultlang;
            if(elementlang == 'lat'){
                if(instance.prefs.getdebugstatus()){
                    console.log("Running word as latin, lang taken from default")
                }
                return processwordlat(event.target, instance);
            }
            if(elementlang == 'grc'){
                if(instance.prefs.getdebugstatus()){
                    console.log("Running word as greek, lang taken from default")
                }
                return processwordgrc(event.target, instance);
            }
            if(elementlang == 'ara'){
                if(instance.prefs.getdebugstatus()){
                    console.log("Running word as Arabic, lang taken from element")
                }
                return processwordara(event.target, instance);
            }
            if(elementlang == 'per'){
                if(instance.prefs.getdebugstatus()){
                    console.log("Running word as Persian, lang taken from element")
                }
                return processwordper(event.target, instance);
            }
            console.log("Language not installed")
    }
}
// process a word with the default values for latin
function processwordlat(srcele, instance) {
    instance.currentlang = "lat";
    var word = window.getSelection().toString();
    //TODO tokenize context and send to response constructor
    var result = new tokenresponse(word,'','','lat','ltr');
    if(instance.prefs.getdebugstatus()){
        console.log(result)
    }
    return result;
}
// process a word with the default values for greek
function processwordgrc(srcele, instance) {
    instance.currentlang = "grc";
    var word = window.getSelection().toString();
    //TODO tokenize context and send to response constructor
    var result = new tokenresponse(word,'','','grc','ltr');
    if(instance.prefs.getdebugstatus()){
        console.log(result)
    }
    return result;
}
// process a word with the default values for arabic
function processwordara(srcele, instance) {
    instance.currentlang = "ara";
    var word = window.getSelection().toString();
    //TODO tokenize context and send to response constructor
    var result = new tokenresponse(word,'','','ara','rtl');
    if(instance.prefs.getdebugstatus()){
        console.log(result)
    }
    return result;
}
// process a word with the default values for greek
function processwordper(srcele, instance) {
    instance.currentlang = "per";
    var word = window.getSelection().toString();
    //TODO tokenize context and send to response constructor
    var result = new tokenresponse(word,'','','per','rtl');
    if(instance.prefs.getdebugstatus()){
        console.log(result)
    }
    return result;
}
