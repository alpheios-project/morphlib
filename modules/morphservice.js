/**
 * Created by Elijah Cooke on 9/7/2016.
 */
import {morphresponse} from "./response.js";
import {analysisresponse} from "./response.js";
import launchpopup from "./popup.js";
import async from "./async";
export default function morphservice (tokenobj, typeservice, serviceuri, apiformat, version, morplibinstance) {
    if(apiformat == "alpheios") {
        if(morplibinstance.prefs.getdebugstatus()){
            console.log("using Alpeios API format")
        }
        if (typeservice == "remote") {
            if(morplibinstance.prefs.getdebugstatus()){
                console.log("performing jQuery ajax request")
            }
            async(serviceuri + tokenobj.selectedtoken,"GET","json", function (result){
                return alpheiosparser(result,morplibinstance, tokenobj)
            })
        }
    } else {
        if (apiformat == "ww") {
            if (morplibinstance.prefs.getdebugstatus()) {
                console.log("using Whitakers Words API format")
            }
            if (typeservice == "remote") {
                if (morplibinstance.prefs.getdebugstatus()) {
                    console.log("performing jQuery ajax request")
                }
                async(serviceuri + tokenobj.selectedtoken,"GET","json",function (result) {
                    return wwparser(result, morplibinstance, tokenobj)
                })
            } else {
                if (morplibinstance.prefs.getdebugstatus()) {
                    console.log("Unknown API format")
                }
            }

        }
    }
}

function wwparser(result, instance, tokenobj) {
    if(instance.currentlang =="lat"){
        if(instance.prefs.getdebugstatus()){
            console.log("Whitakers Words parser for latin started")
        }
        var analysisobjects = [];
        var analysis = result["RDF"]["Annotation"]["Body"];
        if(analysis) {
            if(instance.prefs.getdebugstatus()){
                console.log("body element found in Json morphology json response");
            }
        } else {
            analysis = result["RDF"]["Annotation"];
            if(instance.prefs.getdebugstatus()){
                console.log("No body element found");
            }
        }
        if(Object.prototype.toString.call( analysis ) === '[object Array]' ){
            for (var i = 0; i < analysis.length; i++){
                if(instance.prefs.getdebugstatus()){
                    console.log("Looping through different analyses from morph service")
                }
                if(analysis[i]["rest"]["entry"]["dict"]){
                    if(analysis[i]["rest"]["entry"]["dict"]["hdwd"]){
                        var lemma = analysis[i]["rest"]["entry"]["dict"]["hdwd"]["$"];
                    }
                }
                if(instance.prefs.getdebugstatus()){
                    console.log("Lemma found");
                }
                if(analysis[i]["rest"]["entry"]["dict"]){
                    if(analysis[i]["rest"]["entry"]["dict"]["pofs"]){
                        var pofs = analysis[i]["rest"]["entry"]["dict"]["pofs"]["$"];
                    }
                }
                if(instance.prefs.getdebugstatus()){
                    console.log("part of speech found");
                }

                var shortdef = analysis[i]["rest"]["entry"]["mean"]
                if(instance.prefs.getdebugstatus()){
                    console.log("short definition found");
                }

                var infls = [];
                if(instance.prefs.getdebugstatus()){
                    console.log("starting loop to capture inflections");
                }
                var inflections = analysis[i]["rest"]["entry"]["infl"]
                if(Object.prototype.toString.call( inflections ) === '[object Array]' ){
                    for(var infl in analysis[i]["rest"]["entry"]["infl"]){
                        infls.push(analysis[i]["rest"]["entry"]["infl"][infl]);
                    }
                } else {
                    infls.push(analysis[i]["rest"]["entry"]["infl"]);
                }

                if(instance.prefs.getdebugstatus()){
                    console.log("inflections captured")
                };
                analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
                if(instance.prefs.getdebugstatus()){
                    console.log("analysis added");
                }
            }
        } else {
            if (analysis["rest"]["entry"]["mean"] == "Assume\nthis\nis\ncapitalized\nproper\nname/abbr"){
                if(instance.prefs.getdebugstatus()){
                    console.log("Proper noun");
                }
                shortdef = analysis["rest"]["entry"]["mean"];
                var infls = [];
                infls.push(analysis["rest"]["entry"]["infl"]);
                lemma = "";
                pofs = "";
                analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
                if(instance.prefs.getdebugstatus()){
                    console.log("analysis added");
                }
            } else {
                if(analysis["rest"]["entry"]["dict"]){
                    if(analysis["rest"]["entry"]["dict"]["hdwd"]){
                        var lemma = analysis["rest"]["entry"]["dict"]["hdwd"]["$"];
                    }
                }
                if(instance.prefs.getdebugstatus()){
                    console.log("Lemma found");
                }
                if (analysis["rest"]["entry"]["dict"]){
                    if(analysis["rest"]["entry"]["dict"]["pofs"]){
                        var pofs = analysis["rest"]["entry"]["dict"]["pofs"]["$"];
                    }
                }
                if(instance.prefs.getdebugstatus()){
                    console.log("part of speech found");
                }
                if(analysis["rest"]["entry"]["mean"]){
                    var shortdef = analysis["rest"]["entry"]["mean"]
                }
                if(instance.prefs.getdebugstatus()){
                    console.log("short definition found");
                }
                var infls = [];
                if(instance.prefs.getdebugstatus()){
                    console.log("starting loop to capture inflections");
                }
                var inflections = analysis["rest"]["entry"]["infl"]
                if(Object.prototype.toString.call( inflections ) === '[object Array]'){
                    for(var infl in analysis["rest"]["entry"]["infl"]){
                        infls.push(analysis["rest"]["entry"]["infl"][infl]);
                    }
                } else {
                    infls.push(analysis["rest"]["entry"]["infl"]);
                }

                if(instance.prefs.getdebugstatus()){
                    console.log("inflections captured")
                };
                analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
                if(instance.prefs.getdebugstatus()){
                    console.log("analysis added");
                }
            }

        }
    }
    var response = new morphresponse(tokenobj, analysisobjects, false, "Short definitions and morphology from Words by William Whitaker, Copyright © 1993-2007.");
    launchpopup(response,instance);
    return response;
}

function alpheiosparser (result, instance, tokenobj){
    if(instance.currentlang =="lat"){
        if(instance.prefs.getdebugstatus()){
            console.log("Alpeios parser for latin started")
        }
        var analysisobjects = [];
        var analysis = result["RDF"]["Annotation"]["Body"];
        if(analysis) {
            if(instance.prefs.getdebugstatus()){
                console.log("body element found in Json morphology json response");
            }
        } else {
            analysis = result["RDF"]["Annotation"];
            if(instance.prefs.getdebugstatus()){
                console.log("No body element found");
            }
        }
        if(Object.prototype.toString.call( analysis ) === '[object Array]' ){
            for (var i = 0; i < analysis.length; i++){
                if(instance.prefs.getdebugstatus()){
                    console.log("Looping through different analyses from morph service")
                }
                var lemma = analysis[i]["rest"]["entry"]["dict"]["hdwd"]["$"];
                if(instance.prefs.getdebugstatus()){
                    console.log("Lemma found");
                }
                var pofs = analysis[i]["rest"]["entry"]["dict"]["pofs"]["$"];
                if(instance.prefs.getdebugstatus()){
                    console.log("part of speech found");
                }
                if(instance.shortdeflatin){
                    var shortdef = instance.shortdeflatin[lemma];
                    if(instance.prefs.getdebugstatus()){
                        console.log("short definition found in file");
                    }
                } else {
                    var shortdef = "Short Definition file Missing"
                    if(instance.prefs.getdebugstatus()){
                        console.log("attempting to find shortdef through WW service");
                    }
                    async("http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=lat&engine=whitakerLat&word=" + lemma,"GET","json",function (result){
                        shortdef = result["RDF"]["Annotation"]["Body"]["rest"]["entry"]["mean"]
                    })
                    console.log("short definition uri found");
                }

                var infls = [];
                if(instance.prefs.getdebugstatus()){
                    console.log("starting loop to capture inflections");
                }
                var inflections = analysis[i]["rest"]["entry"]["infl"]
                if(Object.prototype.toString.call( inflections ) === '[object Array]' ){
                    for(var infl in analysis[i]["rest"]["entry"]["infl"]){
                        infls.push(analysis[i]["rest"]["entry"]["infl"][infl]);
                    }
                } else {
                    infls.push(analysis[i]["rest"]["entry"]["infl"]);
                }

                if(instance.prefs.getdebugstatus()){
                    console.log("inflections captured")
                };
                analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
                if(instance.prefs.getdebugstatus()){
                    console.log("analysis added");
                }
            }
        } else {
            var lemma = analysis["rest"]["entry"]["dict"]["hdwd"]["$"];
            if(instance.prefs.getdebugstatus()){
                console.log("Lemma found");
            }
            var pofs = analysis["rest"]["entry"]["dict"]["pofs"]["$"];
            if(instance.prefs.getdebugstatus()){
                console.log("part of speech found");
            }
            if(instance.shortdeflatin){
                var shortdef = instance.shortdeflatin[lemma];
                if(instance.prefs.getdebugstatus()){
                    console.log("short definition uri found");
                }
            } else {
                var shortdef = "Short Definition file Missing"
                if(instance.prefs.getdebugstatus()){
                    console.log("attempting to find shortdef through WW service");
                }
                async("http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=lat&engine=whitakerLat&word=" + lemma,"GET","json",function (result){
                    shortdef = result["RDF"]["Annotation"]["Body"]["rest"]["entry"]["mean"]
                })
                console.log("short definition uri found");
            }
            var infls = [];
            if(instance.prefs.getdebugstatus()){
                console.log("starting loop to capture inflections");
            }
            var inflections = analysis["rest"]["entry"]["infl"]
            if(Object.prototype.toString.call( inflections ) === '[object Array]'){
                for(var infl in analysis["rest"]["entry"]["infl"]){
                    infls.push(analysis["rest"]["entry"]["infl"][infl]);
                }
            } else {
                infls.push(analysis["rest"]["entry"]["infl"]);
            }

            if(instance.prefs.getdebugstatus()){
                console.log("inflections captured")
            };
            analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
            if(instance.prefs.getdebugstatus()){
                console.log("analysis added");
            }
        }
    }
    if(instance.currentlang == "gre"){
        if(instance.prefs.getdebugstatus()){
            console.log("Alpeios parser for greek started")
        }
        var analysisobjects = [];
        var analysis = result["RDF"]["Annotation"]["Body"];
        if(analysis) {
            if(instance.prefs.getdebugstatus()){
                console.log("body element found in Json morphology json response");
            }
        } else {
            analysis = result["RDF"]["Annotation"];
            if(instance.prefs.getdebugstatus()){
                console.log("No body element found");
            }
        }
        if(Object.prototype.toString.call( analysis ) === '[object Array]' ){
            for (var i = 0; i < analysis.length; i++){
                if(instance.prefs.getdebugstatus()){
                    console.log("Looping through different analyses from morph service")
                }
                var lemma = analysis[i]["rest"]["entry"]["dict"]["hdwd"]["$"];
                if(instance.prefs.getdebugstatus()){
                    console.log("Lemma found");
                }
                var pofs = analysis[i]["rest"]["entry"]["dict"]["pofs"]["$"];
                if(instance.prefs.getdebugstatus()){
                    console.log("part of speech found");
                }
                var shortdef = instance.shortdefgreek[lemma];
                if(instance.prefs.getdebugstatus()){
                    console.log("short definition uri found");
                }
                var infls = [];
                if(instance.prefs.getdebugstatus()){
                    console.log("starting loop to capture inflections");
                }
                var inflections = analysis[i]["rest"]["entry"]["infl"]
                if(Object.prototype.toString.call( inflections ) === '[object Array]' ){
                    for(var infl in analysis[i]["rest"]["entry"]["infl"]){
                        infls.push(analysis[i]["rest"]["entry"]["infl"][infl]);
                    }
                } else {
                    infls.push(analysis[i]["rest"]["entry"]["infl"]);
                }

                if(instance.prefs.getdebugstatus()){
                    console.log("inflections captured")
                };
                analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
                if(instance.prefs.getdebugstatus()){
                    console.log("analysis added");
                }
            }
        } else {
            var lemma = analysis["rest"]["entry"]["dict"]["hdwd"]["$"];
            if(instance.prefs.getdebugstatus()){
                console.log("Lemma found");
            }
            var pofs = analysis["rest"]["entry"]["dict"]["pofs"]["$"];
            if(instance.prefs.getdebugstatus()){
                console.log("part of speech found");
            }
            var shortdef = instance.shortdefgreek[lemma];
            if(instance.prefs.getdebugstatus()){
                console.log("short definition uri found");
            }
            var infls = [];
            if(instance.prefs.getdebugstatus()){
                console.log("starting loop to capture inflections");
            }
            var inflections = analysis["rest"]["entry"]["infl"]
            if(Object.prototype.toString.call( inflections ) === '[object Array]'){
                for(var infl in analysis["rest"]["entry"]["infl"]){
                    infls.push(analysis["rest"]["entry"]["infl"][infl]);
                }
            } else {
                infls.push(analysis["rest"]["entry"]["infl"]);
            }

            if(instance.prefs.getdebugstatus()){
                console.log("inflections captured")
            };
            analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
            if(instance.prefs.getdebugstatus()){
                console.log("analysis added");
            }
        }

    }
    if(instance.currentlang == "per"){
        if(instance.prefs.getdebugstatus()){
            console.log("Alpeios parser for persian started")
        }
        var analysisobjects = [];
        var analysis = result["RDF"]["Annotation"]["Body"];
        if(analysis) {
            if(instance.prefs.getdebugstatus()){
                console.log("body element found in Json morphology json response");
            }
        } else {
            analysis = result["RDF"]["Annotation"];
            if(instance.prefs.getdebugstatus()){
                console.log("No body element found");
            }
        }
        if(Object.prototype.toString.call( analysis ) === '[object Array]' ){
            for (var i = 0; i < analysis.length; i++){
                if(instance.prefs.getdebugstatus()){
                    console.log("Looping through different analyses from morph service")
                }
                var lemma = analysis[i]["rest"]["entry"]["dict"]["hdwd"]["$"];
                if(instance.prefs.getdebugstatus()){
                    console.log("Lemma found");
                }
                var pofs = analysis[i]["rest"]["entry"]["dict"]["pofs"]["$"];
                if(instance.prefs.getdebugstatus()){
                    console.log("part of speech found");
                }
                var shortdef = instance.shortdefpersian[lemma];
                if(instance.prefs.getdebugstatus()){
                    console.log("short definition found");
                }
                var infls = [];
                if(instance.prefs.getdebugstatus()){
                    console.log("starting loop to capture inflections");
                }
                var inflections = analysis[i]["rest"]["entry"]["infl"]
                if(Object.prototype.toString.call( inflections ) === '[object Array]' ){
                    for(var infl in analysis[i]["rest"]["entry"]["infl"]){
                        infls.push(analysis[i]["rest"]["entry"]["infl"][infl]);
                    }
                } else {
                    infls.push(analysis[i]["rest"]["entry"]["infl"]);
                }

                if(instance.prefs.getdebugstatus()){
                    console.log("inflections captured")
                };
                analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
                if(instance.prefs.getdebugstatus()){
                    console.log("analysis added");
                }
            }
        } else {
            var lemma = analysis["rest"]["entry"]["dict"]["hdwd"]["$"];
            if(instance.prefs.getdebugstatus()){
                console.log("Lemma found");
            }
            var pofs = analysis["rest"]["entry"]["dict"]["pofs"]["$"];
            if(instance.prefs.getdebugstatus()){
                console.log("part of speech found");
            }
            var shortdef = instance.shortdefpersian[lemma];
            if(instance.prefs.getdebugstatus()){
                console.log("short definition found");
            }
            var infls = [];
            if(instance.prefs.getdebugstatus()){
                console.log("starting loop to capture inflections");
            }
            var inflections = analysis["rest"]["entry"]["infl"]
            if(Object.prototype.toString.call( inflections ) === '[object Array]'){
                for(var infl in analysis["rest"]["entry"]["infl"]){
                    infls.push(analysis["rest"]["entry"]["infl"][infl]);
                }
            } else {
                infls.push(analysis["rest"]["entry"]["infl"]);
            }

            if(instance.prefs.getdebugstatus()){
                console.log("inflections captured")
            };
            analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
            if(instance.prefs.getdebugstatus()){
                console.log("analysis added");
            }
        }

    }
    if(instance.currentlang == "ara"){
        if(instance.prefs.getdebugstatus()){
            console.log("Alpeios parser for arabic started")
        }
        var analysisobjects = [];
        var analysis = result["RDF"]["Annotation"]["Body"];
        if(analysis) {
            if(instance.prefs.getdebugstatus()){
                console.log("body element found in Json morphology json response");
            }
        } else {
            analysis = result["RDF"]["Annotation"];
            if(instance.prefs.getdebugstatus()){
                console.log("No body element found");
            }
        }
        if(Object.prototype.toString.call( analysis ) === '[object Array]' ){
            for (var i = 0; i < analysis.length; i++){
                if(instance.prefs.getdebugstatus()){
                    console.log("Looping through different analyses from morph service")
                }
                var lemma = analysis[i]["rest"]["entry"]["dict"]["hdwd"]["$"];
                if(instance.prefs.getdebugstatus()){
                    console.log("Lemma found");
                }
                var pofs = analysis[i]["rest"]["entry"]["dict"]["pofs"]["$"];
                if(instance.prefs.getdebugstatus()){
                    console.log("part of speech found");
                }
                var shortdef = instance.shortdefarabic[lemma];
                if(instance.prefs.getdebugstatus()){
                    console.log("short definition id found");
                }
                var infls = [];
                if(instance.prefs.getdebugstatus()){
                    console.log("starting loop to capture inflections");
                }
                var inflections = analysis[i]["rest"]["entry"]["infl"]
                if(Object.prototype.toString.call( inflections ) === '[object Array]' ){
                    for(var infl in analysis[i]["rest"]["entry"]["infl"]){
                        infls.push(analysis[i]["rest"]["entry"]["infl"][infl]);
                    }
                } else {
                    infls.push(analysis[i]["rest"]["entry"]["infl"]);
                }

                if(instance.prefs.getdebugstatus()){
                    console.log("inflections captured")
                };
                analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
                if(instance.prefs.getdebugstatus()){
                    console.log("analysis added");
                }
            }
        } else {
            var lemma = analysis["rest"]["entry"]["dict"]["hdwd"]["$"];
            if(instance.prefs.getdebugstatus()){
                console.log("Lemma found");
            }
            var pofs = analysis["rest"]["entry"]["dict"]["pofs"]["$"];
            if(instance.prefs.getdebugstatus()){
                console.log("part of speech found");
            }
            var shortdef = instance.shortdefarabic[lemma];
            if(instance.prefs.getdebugstatus()){
                console.log("short definition id found");
            }
            var infls = [];
            if(instance.prefs.getdebugstatus()){
                console.log("starting loop to capture inflections");
            }
            var inflections = analysis["rest"]["entry"]["infl"]
            if(Object.prototype.toString.call( inflections ) === '[object Array]'){
                for(var infl in analysis["rest"]["entry"]["infl"]){
                    infls.push(analysis["rest"]["entry"]["infl"][infl]);
                }
            } else {
                infls.push(analysis["rest"]["entry"]["infl"]);
            }

            if(instance.prefs.getdebugstatus()){
                console.log("inflections captured")
            };
            analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
            if(instance.prefs.getdebugstatus()){
                console.log("analysis added");
            }
        }

    }
    var response = new morphresponse(tokenobj, analysisobjects, false, "Short definitions and morphology from Persieds");
    launchpopup(response,instance);
    return response;
}