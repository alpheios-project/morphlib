"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Elijah Cooke on 6/28/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/**
 * Main controller function for the Alpheios morphology library
 * @type {{
 *      m_defaultLang: string,
 *      m_response: string,
 *      m_morphService: string,
 *      m_shortDefService: string,
 *      m_disambugationProvider: string,
 *      m_copyrightInfo: string,
 *      m_debugging: boolean,
 *      m_ignoreElements: list,
 *      m_focusElements: list
 *    }}
 */


var _morphlib = require("morphlib.popup");

var Popup = _interopRequireWildcard(_morphlib);

var _morphlib2 = require("morphlib.preferences");

var _morphlib3 = require("morphlib.util");

var Util = _interopRequireWildcard(_morphlib3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var main = function () {
    function main(preffile) {
        _classCallCheck(this, main);

        //Default Language the Alphieos Morphology library will use
        this.defaultLang = "";
        //Holds the morphlib.response object
        this.response = "";
        //holds the location of the morphology provider
        this.morphService = "";
        //holds the locations of the short definition provider
        this.shortDefService = "";
        //holds the location of the disambugation provider
        this.disambugationProvider = "";
        //Copyright information
        this.copyrightInfo = "";
        //a list of element @id and @class values regions of the page to be ignored by the library
        this.ignoreElements = false;
        //a list of element @id and @class values the page to which to limit the activity of the library
        this.focusElements = false;
        //setup preferences from saved preference file
        this.prefs = (0, _morphlib2.preferences)("preferences.json");
    }

    //Initialize function for the class. Adds the even listener for to run morphlib when a page is loaded


    _createClass(main, [{
        key: "init",
        value: function init() {
            window.addEventListener("load", this.onLoad, false);
        }

        /*
        TODO add check for dependencies
         */

    }, {
        key: "onload",
        value: function onload() {
            this.enable();
        }

        /*
        enables the library to run on a browser window
         */

    }, {
        key: "enable",
        value: function enable() {
            lang = false;
            //TODO check is lang is set if not detect
            trigger = "default"; //TODO add call the get from language tool so it can be langauge specfic
            this.setPopupTrigger(lang, trigger);
        }

        /*
        create listener to trigger the creation of the popup with the trigger supplied by the user config
         */

    }, {
        key: "setPopupTrigger",
        value: function setPopupTrigger(lang, trigger) {
            window.addEventListener(trigger, this.createPopup());
        }

        //Handler for the popup trigger event

    }, {
        key: "createPopup",
        value: function createPopup(event) {
            selction = window.getSelection();
            Popup.processText(event, selction, prefs);
        }

        //get the appropiate language tool

    }, {
        key: "getLanguageTool",
        value: function getLanguageTool(elm) {
            var langTool;
            var langKey;
            if (elm) {
                langKey = util.getLanguageforElement(elm);
            }
            if (!langKey) {
                langKey = m_defaultLang;
            }
            if (langKey) {
                langTool = languages.getLanguageToolfromKey();
            }
        }
    }]);

    return main;
}();

exports.default = main;