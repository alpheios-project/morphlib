QUnit.test( "add default event listener", function( assert ) {
    var fixture = '<p id="test-lat" xml:lang="lat">' +
        'Maxima pars Graium Saturno et maxime Athenae'+
        'conficiunt sacra, quae Cronia esse iterantur ab illis,'+
        'eumque diem celebrant: per agros urbesque fere omnes'+
        'exercent epulas laeti famulosque procurant'+
        'quisque suos; nosterque itidem est mos traditus illinc'+
        'iste, ut cum dominis famuli epulentur ibidem.'+
        '</p>'+
        '<p id="test-gre" xml:lang="gre">'+
        'δέομαι ὑμῶν, ὦ ἄνδρες Ἀθηναῖοι, ἐθελῆσαί μου μετ᾽ εὐνοίας ἀκοῦσαι λέγοντος, ὑπολογιζομένους τό τε μέγεθος τοῦ κινδύνου καὶ τὸ πλῆθος τῶν αἰτιῶν πρὸς ἂς ἀπολογήσασθαί με δεῖ, καὶ τὰς τέχνας καὶ τὰς κατασκευὰς τοῦ κατηγόρου καὶ τὴν ὠμότητα, ὃς ἐτόλμησε παρακελεύσασθαι πρὸς ἄνδρας ὀμωμοκότας τῶν ἀντιδίκων ὁμοίως ἀμφοτέρων ἀκούσεσθαι τοῦ κινδυνεύοντος φωνὴν μὴ ὑπομένειν.'+
    '</p>;'
    document.body.insertAdjacentHTML('afterbegin', fixture);

    var lib = new morphlibrary(document);
    lib.activate("gre");
    var stuff = jQuery("body").data("events")
    assert.notEqual(null, stuff, "events there");
});