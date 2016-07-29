"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Elijah Cooke on 7/12/2016.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _morphlib = require("morphlib.async");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var preferences = function () {
    function preferences(prefFile) {
        _classCallCheck(this, preferences);

        prefdata = (0, _morphlib.async)("GET", prefFile, { "type": "text" });
        prefs = JSON.parse(prefdata);
    }

    _createClass(preferences, [{
        key: "setMouseAction",
        value: function setMouseAction(lang, newAction) {
            installedlangs = prefs.languages[2];
            for (var intlang in installedlangs["installedlangs"]) {
                if (installedlangs["installedlangs"][intlang]["code"] == lang) {
                    installedlangs["installedlangs"][intlang]["mouseaction"] == newAction;
                }
            }
        }
    }, {
        key: "getMouseAction",
        value: function getMouseAction(lang) {
            installedlangs = prefs.languages[2];
            for (var intlang in installedlangs["installedlangs"]) {
                if (installedlangs["installedlangs"][intlang]["code"] == lang) {
                    return installedlangs["installedlangs"][intlang]["mouseaction"];
                }
            }
        }
    }, {
        key: "getdebugstatus",
        value: function getdebugstatus() {
            return prefs.debug;
        }
    }]);

    return preferences;
}();

exports.default = preferences;