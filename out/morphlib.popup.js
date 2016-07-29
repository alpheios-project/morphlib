"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.processText = processText;

var _morphlib = require("morphlib.main");

var main = _interopRequireWildcard(_morphlib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function processText(event, selection, prefs) {
    debug = prefs.getdebugstatus();
    test = window.getSelection();
    if (selection.isCollapsed) {
        if (debug) {
            console.log("Process Text: No Data Found");
        }
        return;
    }
    text = test.toString();
    //TODO check to see if site has set word to be ignored
    //TODO add disable for areas of the page to be ignored
    //TODO add rule for mixed site
    parentNode = test.anchorNode.parentNode.textContent;
    //TODO add check for whitespace
    //TODO check if treebank exists
    results = "HTML RESULTS(placeholder)"; //TODO return real result
    popupwindow = createPopup();
} /**
   * Created by elijah on 6/30/16.
   */

function createPopup() {
    debug = true; //TODO get debug stetting from preference file
    //TODO take window name from preference file
    var myWindow = window.open("", "morplibWindow", "width=600,height=400");
    if (!myWindow) {
        if (debug) {
            console.log("Warning popup window failed to create popup window");
        }
        alert("Morphology Library failed to create a popup");
        return;
    }
    if (debug) {
        console.log("Popup window created successfully");
    }
    return myWindow;
}