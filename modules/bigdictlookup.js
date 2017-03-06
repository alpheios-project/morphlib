/**
 * Created by Elijah Cooke on 1/20/2017.
 */
import async from "./async";
import jQuery from 'jquery';

export default function bigdictlookup(instance, popup, lang, originalform, lemma) {
    if (instance.prefs.getdebugstatus()) {
        console.log("Starting big dictionary lookup")
    }
    var data;
    var uri;
    if (lang == "grc") {
        uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lsj&lg=grc&out=HTML&l=" + lemma;
    } else if (lang == "lat") {
        var splitlemma = lemma.split(",")
        if (Object.prototype.toString.call(splitlemma) === '[object Array]') {
            var lemmas = "";
            for (var i = 0; i < splitlemma.length; i++){
                lemmas = lemmas + "&l=" + splitlemma[i];
            }
            uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=HTML" + lemmas;
        } else {
            uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=HTML&l=" + lemma
        }

    } else if (lang == "ara") {
        uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=sal&lg=ara&out=HTML&l=" + lemma;
    } else if (lang == "per") {
        uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=stg&lg=per&out=HTML&l=" + lemma;
    }
    async(uri, "GET", "html", function (result) {
        popup.document.getElementById("morphlibwindowdictlookup").innerHTML = "<div id='dictentry1' class='morphlib-dict'>" + result + "</div>"
        if(lang == "grc"){
            uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ml&lg=grc&out=HTML&l=" + lemma;
            var secdict = document.createElement("div");
            secdict.setAttribute("id","dictentry2");
            secdict.setAttribute("class","morphlib-dict");
            secdict.setAttribute("style","visibility: hidden; position: absolute; top: 0px;");
            popup.document.getElementById("morphlibwindowdictlookup").appendChild(secdict);
            var dicttoggle = document.createElement("button");
            dicttoggle.setAttribute("id","toggledict");
            dicttoggle.setAttribute("type","button");
            dicttoggle.setAttribute("onclick","togglehiddengreek()");
            dicttoggle.setAttribute("style","position: absolute; right: 10px; top: -25px;");
            dicttoggle.innerHTML = "Toggle Greek Dictionaries"
            popup.document.getElementById("morphlibwindowdictlookup").appendChild(dicttoggle);
            secdict.innerHTML = '<img src="http://www.cuisson.co.uk/templates/cuisson/supersize/slideshow/img/progress.BAK-FOURTH.gif">'
            async(uri, "GET", "html", function (result) {
                secdict.innerHTML = result
            })
        }
    })
}
