QUnit.test("test of preference object", function(assert){
    prefobj = preferences("preferences.json");
    isprefobj = prefobj instanceof preferences;
    assert.equal(True,isprefobj);
})