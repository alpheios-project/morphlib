/**
 * Created by Elijah Cooke on 1/20/2017.
 */
import async from "./async";

export default function bigdictlookup(instance, popup, lang, originalform, lemma) {
    if (instance.prefs.getdebugstatus()) {
        console.log("Starting big dictionary lookup")
    }
    var data;
    var uri;
    if (lang == "grc") {
        uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lsj&lg=grc&out=HTML&l=" + lemma;
    } else if (lang = "lat") {
        if (Object.prototype.toString.call(lemma) === '[object Array]') {
            uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=HTML&l=" + lemma[0];
        } else {
            uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=HTML&l=" + lemma
        }

    } else if (lang = "ara") {
        uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=sal&lg=ara&out=HTML&l=" + lemma;
    } else if (lang = "per") {
        uri = "http://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=stg&lg=per&out=HTML&l=" + lemma;
    }
    async(uri, "GET", "html", function (result) {
        popup.document.write("<div id='morphlibwindowdictlookup' style='visibility: hidden'>" + result + "</div>")
    })
}
