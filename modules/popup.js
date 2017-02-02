/**
 * Created by elijah on 6/30/16.
 */
import * as main from "./morphlib"
import bigdictlookup from "./bigdictlookup.js";
export default function launchPopup(morpgresponse, instance){
    var debug = instance.prefs.getdebugstatus();
    var myWindow;
    if(instance.popup){
        instance.popup.close();
        myWindow = window.open("", "morplibWindow", "width=600,height=400");
        myWindow.document.open();
        myWindow.focus();
    } else {
        myWindow = window.open("", "morplibWindow", "width=600,height=400");
    }
    myWindow.document.write('<head><link rel="stylesheet" href="morphwindow.css" type="text/css" /><title>Morphology Library Window</title> </head>');
    myWindow.document.write('<script> function togglehidden() { if(document.getElementById("morphlibwinmorph").style.visibility=="hidden"){ document.getElementById("morphlibwinmorph").style.visibility = "visible"; } else { document.getElementById("morphlibwinmorph").style.visibility = "hidden"; } if(document.getElementById("morphlibwindowdictlookup").style.visibility== "hidden"){ document.getElementById("morphlibwindowdictlookup").style.visibility = "visible"; } else { document.getElementById("morphlibwindowdictlookup").style.visibility = "hidden"; } } </script>');
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
    myWindow.document.write('<div id="morphlibwinmorph" style="visibility: visible" context="'+morpgresponse.originalform+' class="morphlib-word morphlib-word-first">')
    for (var i = 0; i < entries.length; i++){
        myWindow.document.write('<div class="morphlib-entry">');
        myWindow.document.write('<div class="morplib-dict"><span class="morphlib-hdwd">'+entries[i].lemma+': </span>');
        myWindow.document.write('<div class="morphlib-morph"><span class="morphlib-pofs" context="'+entries[i].partofspeech+'">'+entries[i].partofspeech+'</span>');
        myWindow.document.write('</div>');
        myWindow.document.write('</div>');
        myWindow.document.write('<div class="morphlib-mean">'+entries[i].shortdefinition);
        myWindow.document.write('</div>');
        myWindow.document.write('<div class="morphlib-label morphlib-form-label">Form(s):</div>');
        for (var x = 0; x < entries[i].inflections.length; x++){
            var form = entries[i].inflections[x]["term"]["stem"];
            if(entries[i].inflections[x]["term"]["suff"]){
                form = form + "-" + entries[i].inflections[x]["term"]["suff"];
            }
            myWindow.document.write('<div class="morphlib-infl-set" context="'+form+'" class="morphlib-infl-set"><span class="morphlib-term">'+form+'</span>');
            myWindow.document.write('<div class="morphlib-infl">')
            if(entries[i].inflections[x]["pers"]){
                myWindow.document.write('<span class="morphlib-pers">'+entries[i].inflections[x]["pers"]+' person</span>')
            }
            if(entries[i].inflections[x]["num"]){
                myWindow.document.write('<span class="morphlib-num">'+entries[i].inflections[x]["num"]+'; </span>')
            }
            if(entries[i].inflections[x]["tense"]){
                myWindow.document.write('<span class="morphlib-tense">'+entries[i].inflections[x]["tense"]+' </span>')
            }
            if(entries[i].inflections[x]["mood"]){
                myWindow.document.write('<span class="morphlib-mood">'+entries[i].inflections[x]["mood"]+'; </span>')
            }
            if(entries[i].inflections[x]["voice"]){
                myWindow.document.write('<span class="morphlib-voice">'+entries[i].inflections[x]["voice"]+'</span>')
            }
            if(entries[i].inflections[x]["case"]){
                myWindow.document.write('<span class="morphlib-voice">'+entries[i].inflections[x]["case"]["$"]+'</span>')
            }
            myWindow.document.write('</div></div>')
        }
        myWindow.document.write('</div>');
    }
    myWindow.document.write('<div>'+morpgresponse.credits+'</div>');
    myWindow.document.write("</div>");
    myWindow.document.write('<div><button id="toggledict" type="button" onclick="togglehidden()">Toggle Full Dictionary</button></div>');
    myWindow.focus();
    bigdictlookup(instance, myWindow, morpgresponse.lang, morpgresponse.originalform, entries[0].lemma)
    //myWindow.document.write("<div id='morphlibwindowdictlookup' style='visibility: hidden'>" + bigdictlookup(instance, morpgresponse.lang, morpgresponse.originalform, entries[0].lemma) + "</div>")
    instance.popup = myWindow;
}
