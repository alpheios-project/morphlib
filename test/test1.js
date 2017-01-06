QUnit.test( "add default event listener", function( assert ) {
    var fixture = '<div xml:lang="lat"><div><p id="test-lat">' +
        'Maxima pars Graium Saturno et maxime Athenae'+
        'conficiunt sacra, quae Cronia esse iterantur ab illis,'+
        'eumque diem celebrant: per agros urbesque fere omnes'+
        'exercent epulas laeti famulosque procurant'+
        'quisque suos; nosterque itidem est mos traditus illinc'+
        'iste, ut cum dominis famuli epulentur ibidem.'+
        '</p></div></div>'+
        '<div xml:lang="bad"><div xml:lang="lat"><p id="test-lat2">' +
        'Maxima pars Graium Saturno et maxime Athenae'+
        'conficiunt sacra, quae Cronia esse iterantur ab illis,'+
        'eumque diem celebrant: per agros urbesque fere omnes'+
        'exercent epulas laeti famulosque procurant'+
        'quisque suos; nosterque itidem est mos traditus illinc'+
        'iste, ut cum dominis famuli epulentur ibidem.'+
        '</p></div></div>'+
        '<p id="test-grc" xml:lang="grc">'+
        'δέομαι ὑμῶν, ὦ ἄνδρες Ἀθηναῖοι, ἐθελῆσαί μου μετ᾽ εὐνοίας ἀκοῦσαι λέγοντος, ὑπολογιζομένους τό τε μέγεθος τοῦ κινδύνου καὶ τὸ πλῆθος τῶν αἰτιῶν πρὸς ἂς ἀπολογήσασθαί με δεῖ, καὶ τὰς τέχνας καὶ τὰς κατασκευὰς τοῦ κατηγόρου καὶ τὴν ὠμότητα, ὃς ἐτόλμησε παρακελεύσασθαι πρὸς ἄνδρας ὀμωμοκότας τῶν ἀντιδίκων ὁμοίως ἀμφοτέρων ἀκούσεσθαι τοῦ κινδυνεύοντος φωνὴν μὴ ὑπομένειν.'+
    '</p>;'
    document.body.insertAdjacentHTML('afterbegin', fixture);
    var lib = new morphlibrary(document);
    lib.activate("grc");


    console.log("test data1")
    console.log($("body").tr);
    console.log("test data2")
    assert.ok($("#test-lat").trigger("click"))
});
QUnit.test("Test current language method", function( assert ) {
    var doc = $(document);
    var lib = new morphlibrary(document);
    lib.activate("grc");

    var dlang = lib.defaultlang;
    assert.equal(dlang,"grc", "Default language at library activation works")
    var clang = lib.currentLanguage();
    assert.equal(clang,"grc", "Current language works with default lang")
});
QUnit.test("Test language detection from @xml:lang attribute", function( assert ) {
    var doc = $(document);
    var lib = new morphlibrary(document);
    lib.activate("grc");

    var clang;
    $("#test-lat").trigger("dblclick", {target:"diem"});
    clang = lib.currentLanguage();
    assert.equal(clang,"lat", "detecting language from an @xml:lang attribute on the ancestor parent element")
    $("#test-grc").trigger("dblclick", {target:"ἄνδρες"});
    clang = lib.currentLanguage();
    assert.equal(clang,"grc", "detecting language from an @xml:lang attribute on the selected element ")
     $("#test-lat2").trigger("dblclick", {target:"diem"});
    clang = lib.currentLanguage();
    assert.equal(clang,"lat", "detecting language from an @xml:lang attribute on the immediate parent element and making sure it take attribute frm closed parent")

});

QUnit.test("Test Persieds Parser", function( assert ) {
    var doc = $(document);
    var lib = new morphlibrary(document);
    lib.activate("lat");

    var clang;
    var sel = window.getSelection();
    sel.removeAllRanges();
    var range = document.createRange();
    var startNode = document.getElementById("test-grc");
    var startOffset = 7;
    var endOffset = 11;
    range.setStart(startNode,startOffset);
    range.setEnd(startNode, endOffset);
    sel.addRange(range);
    $("#test-grc").trigger("dblclick", {target:"ἄνδρες"});
    assert.equal(lib.morphService,"alpheios")
    clang = lib.currentLanguage();
    assert.equal(clang,"grc", "detecting language from an @xml:lang attribute on the selected element ")
    $("#test-lat2").trigger("dblclick", {target:"diem"});
    clang = lib.currentLanguage();
    assert.equal(clang,"lat", "detecting language from an @xml:lang attribute on the immediate parent element and making sure it take attribute frm closed parent")

});