/**
 * Created by elijah on 6/30/16.
 */

import * as main from "./morphlib"
export default function launchPopup(morpgresponse, instance){
    var debug = instance.prefs.getdebugstatus();
    var myWindow = window.open("", "morplibWindow", "width=600,height=400");
    if(!myWindow){
        if(debug){
            console.log("Warning popup window failed to create popup window")
        }
        alert("Morphology Library failed to create a popup")
        return
    }
    if(debug){
        console.log("Popup window created successfully")
    }
    var entries = morpgresponse.analysisobjects
    myWindow.document.write('<div context="'+morpgresponse.originalform+' class="morphlib-word morphlib-word-first">')
    for (var i = 0; i < entries.length; i++){
        myWindow.document.write('<div class="alph-entry">');
        myWindow.document.write('<div class="morplib-dict"><span class="morphlib-hdwd">'+entries[i].lemma+': </span>');
        myWindow.document.write('<div class="morphlib-morph"><span class="morphlib-pofs" context="'+entries[i].partofspeech+'">'+entries[i].partofspeech+'</span>');
        myWindow.document.write('</div>');
        myWindow.document.write('</div>');
        myWindow.document.write('<div class="morphlib-mean">'+entries[i].shortdefinition);
        myWindow.document.write('</div>');
        myWindow.document.write('<div class="morphlib-label morphlib-form-label">Form(s):</div>');
        myWindow.document.write('<div context="'+entries[i].lemma+'" class="morphlib-infl-set"><span class="morphlib-term">'+entries[i].lemma+'</span></div>');
        myWindow.document.write('</div>');
    }
    myWindow.document.write("</div>")
    return myWindow
}
