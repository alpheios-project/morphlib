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
            if(Object.prototype.toString.call( serviceuri ) === '[object Array]' ){
                async(serviceuri[0] + tokenobj.selectedtoken + serviceuri[1],"GET","json", function (result){
                    return alpheiosparser(result,morplibinstance, tokenobj)
                })
            } else {
                async(serviceuri + tokenobj.selectedtoken,"GET","json", function (result){
                    return alpheiosparser(result,morplibinstance, tokenobj)
                })
            }

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
    instance.morphService = "whitakerswords";
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
                var lemma = "";
                var pofs = "";
                var shortdef = "";
                var infls = [];
                if(instance.prefs.getdebugstatus()){
                    console.log("Looping through different analyses from morph service")
                }
                if(analysis[i]["rest"]["entry"]["dict"]){
                    if(analysis[i]["rest"]["entry"]["dict"]["hdwd"]){
                        lemma = analysis[i]["rest"]["entry"]["dict"]["hdwd"]["$"];
                        if(instance.prefs.getdebugstatus()){
                            console.log("Lemma found");
                        }
                    }
                }
                if(analysis[i]["rest"]["entry"]["dict"]){
                    if(analysis[i]["rest"]["entry"]["dict"]["pofs"]){
                      pofs = analysis[i]["rest"]["entry"]["dict"]["pofs"]["$"];
                      if(instance.prefs.getdebugstatus()){
                        console.log("part of speech found");
                      }
                    }
                }

                var shortdefh = analysis[i]["rest"]["entry"]["mean"];
                if(Object.prototype.toString.call( shortdefh ) === '[object Array]' ){
                    for (var l = 0; l < shortdefh.length; l++){
                        shortdef = shortdef + shortdefh[l] + "&#13;&#10;";
                    }
                } else {
                    shortdef = shortdefh
                }
                if(instance.prefs.getdebugstatus()){
                    console.log("short definition found");
                }

                if(instance.prefs.getdebugstatus()){
                    console.log("starting loop to capture inflections");
                }
                var inflections = analysis[i]["rest"]["entry"]["infl"];
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
                var lemma = "";
                var pofs = "";
                analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
                if(instance.prefs.getdebugstatus()){
                    console.log("analysis added");
                }
            } else {
              var lemma = "";
              var pofs = "";
              var shortdef = "";
              var infls = [];
                if(analysis["rest"]["entry"]["dict"]){
                    if(analysis["rest"]["entry"]["dict"]["hdwd"]){
                        lemma = analysis["rest"]["entry"]["dict"]["hdwd"]["$"];
                    }
                }
                if(instance.prefs.getdebugstatus()){
                    console.log("Lemma found");
                }
                if (analysis["rest"]["entry"]["dict"]){
                    if(analysis["rest"]["entry"]["dict"]["pofs"]){
                        pofs = analysis["rest"]["entry"]["dict"]["pofs"]["$"];
                    }
                }
                if(instance.prefs.getdebugstatus()){
                    console.log("part of speech found");
                }
                if(analysis["rest"]["entry"]["mean"]){
                    var shortdefh = analysis["rest"]["entry"]["mean"];
                    if(Object.prototype.toString.call( shortdefh ) === '[object Array]' ){
                        for (var l = 0; l < shortdefh.length; l++){
                            shortdef = shortdef + shortdefh[l] + "&#13;&#10;";
                        }
                    } else {
                        shortdef = shortdefh
                    }
                }
                if(instance.prefs.getdebugstatus()){
                    console.log("short definition found");
                }
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
    var response = new morphresponse(tokenobj, analysisobjects, false, "Short definitions and morphology from Words by William Whitaker, Copyright © 1993-2016. Services provided by The Perseids Project at Tufts University and Alpheios.net.", instance.currentlang);
    launchpopup(response,instance);
    return response;
}

function alpheiosparser (result, instance, tokenobj){
    instance.morphService = "alpheios";
    if(instance.prefs.getdebugstatus()){
        console.log("Alpeios parser for " + instance.currentlang + " started");
    }
    let analysisobjects = [];
    let body = result["RDF"]["Annotation"]["Body"];
    let credits;
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
    let analysis;
    if(Object.prototype.toString.call( body ) !== '[object Array]' ) {
      analysis = [ body ];
    } else {
      analysis = body;
    }
    for (let i = 0; i < analysis.length; i++){
        let lemma = "";
        let pofs = "";
        let shortdef = "";
        let infls = [];
        if(instance.prefs.getdebugstatus()){
            console.log("Looping through different analyses from morph service")
        }

        if (analysis[i]["rest"]["entry"]["dict"]) {
          if (analysis[i]["rest"]["entry"]["dict"]["hdwd"]) {
            lemma = analysis[i]["rest"]["entry"]["dict"]["hdwd"]["$"];
            if (instance.prefs.getdebugstatus()) {
              console.log("Lemma found");
            }
          }
          if (analysis[i]["rest"]["entry"]["dict"]["pofs"]) {
            pofs = analysis[i]["rest"]["entry"]["dict"]["pofs"]["$"];
            if (instance.prefs.getdebugstatus()) {
              console.log("part of speech found");
            }
          }
        }
        switch(instance.currentlang) {
          case 'lat':
            if (instance.shortdeflatin) {
              shortdef = instance.shortdeflatin[lemma];
              if (instance.prefs.getdebugstatus()) {
                console.log("short definition found in file");
              }
            } else {
              shortdef = "Short Definition file Missing";
              if (instance.prefs.getdebugstatus()) {
                console.log("attempting to find shortdef through WW service");
              }
              async("http://services.perseids.org/bsp/morphologyservice/analysis/word?lang=lat&engine=whitakerLat&word=" + lemma, "GET", "json", function (result) {
                shortdef = result["RDF"]["Annotation"]["Body"]["rest"]["entry"]["mean"]
              })
              console.log("short definition uri found");
            }
            credits = "";
            break;
          case 'grc':
            if (instance.shortdefgreek) {
              shortdef = instance.shortdefgreek[lemma];
              if(instance.prefs.getdebugstatus()) {
                console.log("short definition uri found");
              }
            }
            credits = "Morphology provided by Morpheus from the Perseus Digital Library at Tufts University. Short Definitions from A Greek-English Lexicon (Henry George Liddell, Robert Scott). Services provided by The Perseids Project at Tufts University."
            break;
          case 'per':
            if (instance.shortdefpersian) {
              shortdef = instance.shortdefpersian[lemma];
            }
            if(instance.prefs.getdebugstatus()){
              console.log("short definition found");
            }
            credits = "Morphology from the HAZM Analyzer adapted by the Roshan Institute for Persian Studies at UMD and the Perseids Project at Tufts University. Short definitions from A Comprehensive Persian-English Dictionary (Joseph Steingass)."
            break;
          case 'ara':
            shortdef =  analysis[i]["rest"]["entry"]["mean"];
            if(instance.prefs.getdebugstatus()){
              console.log("short definition id found");
            }
            credits = "Morphology provided by Buckwalter Arabic Morphological Analyzer Version 2.0 from QUAMUS LLC (www.quamus.org). Short definitions from An Advanced Learner's Arabic Dictionary (H. Anthony Salmone). Services provided by The Perseids Project at Tufts University and Alpheios.net."
            break;
          default:
              break;
        }

        if(instance.prefs.getdebugstatus()){
            console.log("starting loop to capture inflections");
        }
        let inflections = analysis[i]["rest"]["entry"]["infl"]
        if(Object.prototype.toString.call( inflections ) === '[object Array]' ){
            for(let infl in analysis[i]["rest"]["entry"]["infl"]){
                infls.push(analysis[i]["rest"]["entry"]["infl"][infl]);
            }
        } else {
            infls.push(analysis[i]["rest"]["entry"]["infl"]);
        }

        if(instance.prefs.getdebugstatus()){
          console.log("inflections captured")
        }
        analysisobjects.push(new analysisresponse(lemma, pofs, shortdef, infls, true));
        if(instance.prefs.getdebugstatus()){
            console.log("analysis added");
        }
    }
    let response = new morphresponse(tokenobj, analysisobjects, false, credits, instance.currentlang);
    launchpopup(response,instance);
    return response;
}