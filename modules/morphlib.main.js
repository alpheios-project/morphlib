/**
 * Created by Elijah Cooke on 6/28/2016.
 */
/**
 * Global namespace
 * @type {{}}
 */
var morphlib = morphlib || {};

morphlib.main = {
    //Default Language the Alphieos Morphology library will use
    m_defaultLang: "",
    //Holds the morphlib.response object
    m_response: "",
    //holds the location of the morphology provider
    m_morphService: "",
    //holds the locations of the short definition provider
    m_shortDefService: "",
    //holds the location of the disambugation provider
    m_disambugationProvider: "",
    //Copyright information
    m_copyrightInfo: "",
    //debugging setting
    m_debugging: false,
    //a list of element @id and @class values regions of the page to be ignored by the library
    m_ignoreElements:false,
    //a list of element @id and @class values the page to which to limit the activity of the library
    m_focusElements:false,
}