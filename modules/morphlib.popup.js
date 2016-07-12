/**
 * Created by elijah on 6/30/16.
 */

import * as main from "morphlib.main"
export function processText(event, selection) {
    test = window.getSelection()
    if(selection.isCollapsed){
        throw new Error("Process Text: No Data Found")
        return;
    }
    text = test.toString();
    //TODO check to see if site has set word to be ignored
    //TODO add disable for areas of the page to be ignored
    //TODO add rule for mixed site
    parentNode = test.anchorNode.parentNode.textContent
    //TODO add check for whitespace
    //TODO check if treebank exists
}