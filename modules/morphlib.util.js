/**
 * Created by Elijah Cooke on 6/28/2016.
 */
export function getLanguageforElement(event, ele) {
    var lang_key = null;
    var elem_lang = null;
    var checkSet = Alph.$(a_elem).add(Alph.$(a_elem).parents());
    // iterate through the set of the element and its parents
    // taking the value of the first lang or xml:lang attribute found
    // order of parents added in checkSet is closest-first
    for (var i=0; i<checkSet.length; i++)
    {
        var elem = checkSet.eq(i)
        elem_lang = elem.attr("lang") || elem.attr("xml:lang");
        if (elem_lang)
            {
             break;
            }
    }
    if(elem_lang)
        {
           elem_lang = Alph.Languages.mapLanguage(elem_lang);
        }
    if (elem_lang && Alph.Languages.hasLang(elem_lang))
        {
           lang_key = elem_lang;
        }
    4return lang_key;
}