/**
 * Created by Elijah Cooke on 8/30/2016.
 */
import * as main from "./morphlib"
import {tokenresponse} from "./response.js";
export default function eventhandler(event, instance, trigger) {
    if(instance.prefs.getdebugstatus()){
        console.log("Event Triggered")
    }
    var elementlang;
    if(event.target.attributes["xml:lang"]){
        elementlang = event.target.attributes["xml:lang"].nodeValue;
        if(elementlang == 'lat'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as latin, lang taken from element")
            }
            return processwordlat(event.target, instance);
        }
        if(elementlang == 'gre'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as Greek, lang taken from element")
            }
            return processwordgre(event.target, instance);
        }
    } else {
        elementlang = instance.defaultlang;
        if(elementlang == 'lat'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as latin, lang taken from default")
            }
            return processwordlat(event.target, instance);
        }
        if(elementlang == 'gre'){
            if(instance.prefs.getdebugstatus()){
                console.log("Running word as greek, lang taken from default")
            }
            return processwordgre(event.target, instance);
        }
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
function processwordgre(srcele, instance) {
    instance.currentlang = "gre";
    var word = window.getSelection().toString();
    //TODO tokenize context and send to response constructor
    var result = new tokenresponse(word,'','','gre','ltr');
    if(instance.prefs.getdebugstatus()){
        console.log(result)
    }
    return result;
}
