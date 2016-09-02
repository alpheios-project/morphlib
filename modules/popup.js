/**
 * Created by elijah on 6/30/16.
 */

import * as main from "./morphlib"
function launchPopup(){
    var debug = true; //TODO get debug stetting from preference file
    //TODO take window name from preference file
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
    return myWindow
}
