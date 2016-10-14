/**
 * Created by Elijah Cooke on 9/7/2016.
 */
import jQuery from 'jquery';
import {morphresponse} from "./response.js";
import {analysisresponse} from "./response.js";
import launchpopup from "./popup.js";
export default function morphservice (tokenobj, typeservice, serviceuri, apiformat, version, morplibinstance) {
    if(apiformat == "alpheios") {
        if(morplibinstance.prefs.getdebugstatus()){
            console.log("using Alpeios API format")
        }
        if (typeservice == "remote") {
            if(morplibinstance.prefs.getdebugstatus()){
                console.log("performing jQuery ajax request")
            }
            jQuery.ajax({
                url: serviceuri + tokenobj.selectedtoken,
                type: "GET",
                dataType: "json",
                success: function (result){
                    return alpheiosparser(result,morplibinstance, tokenobj)
                }
            });
        }
    } else {
        if(morplibinstance.prefs.getdebugstatus()){
            console.log("Unknown API format")
        }
    }
}

function alpheiosparser (result, instance, tokenobj){
    if(instance.currentlang =="lat"){
        if(instance.prefs.getdebugstatus()){
            console.log("Alpeios parser latin started")
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
            var shortdef = analysis[i]["rest"]["entry"]["uri"];
            if(instance.prefs.getdebugstatus()){
                console.log("short definition uri found");
            }
            var infls = [];
            if(instance.prefs.getdebugstatus()){
                console.log("starting loop to capture inflections");
            }
            for(var infl in analysis[i]["rest"]["entry"]["infl"]){
                infls.push(analysis[i]["rest"]["entry"]["infl"][infl]);
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
                        infls.push(analysis[i]["rest"]["entry"]["infl"][infl]["term"]["stem"]+"-"+analysis[i]["rest"]["entry"]["infl"][infl]["term"]["suff"]);
                    }
                } else {
                    infls.push(analysis[i]["rest"]["entry"]["infl"]["term"]["stem"]+"-"+analysis[i]["rest"]["entry"]["infl"]["term"]["suff"]);
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
                    infls.push(analysis["rest"]["entry"]["infl"][infl]["term"]["stem"]+"-"+analysis["rest"]["entry"]["infl"][infl]["term"]["suff"]);
                }
            } else {
                infls.push(analysis["rest"]["entry"]["infl"]["term"]["stem"]+"-"+analysis["rest"]["entry"]["infl"]["term"]["suff"]);
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
    var response = new morphresponse(tokenobj, analysisobjects, false);
    launchpopup(response,instance);
    return response;
}