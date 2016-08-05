/**
 * Created by Elijah Cooke on 6/28/2016.
 */
export function getLanguageforElement( ele) {
    var lang_key = null;
    var elem_lang = null;
    // iterate through the set of the element and its parents
    // taking the value of the first lang or xml:lang attribute found
    // order of parents added in checkSet is closest-first
    //TODO check if element or parent elements contains xml:lang attribute 
    return lang_key;
}
export function createjsonobj (prefFile){
    var prefsJSON;
    jquery.getJSON(prefFile).then(function(data) {
        prefsJSON = data;
        console.log(prefsJSON);
    })
    return prefsJSON;
}
