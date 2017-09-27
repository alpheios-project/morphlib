/** * Created by Elijah Cooke on 8/30/2016.
 */
import * as main from "./morphlib"
import {tokenresponse} from "./response.js";
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

  if (event.target.attributes["xml:lang"]) {
    elementlang = event.target.attributes["xml:lang"].nodeValue;
  } else if (jqid && $(jqid).parents("[xml\\:lang]").length > 0) {
    elementlang = $(jqid).parents("[xml\\:lang]")[0].attributes["xml:lang"].nodeValue;
  }

  var langfrom = 'element';
  if (! elementlang || elementlang == "") {
    if (! instance.defaultlang) {
      instance.deflangui();
    }
    elementlang =  instance.defaultlang;
    langfrom = 'default';
  }
  if (instance.prefs.getdebugstatus()) {
    console.log("Running word as " + elementlang + ", lang taken from " + langfrom);
  }

  if (elementlang !== '') {
    instance.currentlang = elementlang;
    console.log("Running word as " + elementlang + ", lang taken from " + langfrom);
  } else {
    console.log("Unable to identify a language");
  }

  var rv = null;

  switch (elementlang) {
    case 'lat':
      rv = processwordlat(event.target, instance);
      break;
    case 'grc':
      rv = processwordgrc(event.target, instance);
      break;
    case 'ara':
      rv = processwordara(event.target, instance);
      break;
    case 'per':
      rv = processwordara(event.target, instance);
      break;
    default:
      console.log("Language not installed")
    }
    return rv;
}
// process a word with the default values for latin
function processwordlat(srcele, instance) {
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
    var word = window.getSelection().toString();
    //TODO tokenize context and send to response constructor
    var result = new tokenresponse(word,'','','per','rtl');
    if(instance.prefs.getdebugstatus()){
        console.log(result)
    }
    return result;
}
