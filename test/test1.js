describe("test activate method", function () {
    it("add default event listener", function () {
        var lib = new morphlibrary(document);
        spyOn($);
        lib.activate("gre");
        expect($("body").on).toHaveBeenCalled("dblclick");
    })
})