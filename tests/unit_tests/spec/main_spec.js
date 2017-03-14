describe("Main", function () {

  describe("maxLengthAchieved", function () {
    it("returns false if no element is passed", function () {
      expect(Main.maxLengthAchieved()).toBe(false);
    });
    it("returns false if the element does not have a 'maxlength' attribute", function () {
      var dummyElement = document.createElement("input");
      expect(Main.maxLengthAchieved(dummyElement)).toBe(false);
    });
    it("returns false if the element does not have a value", function () {
      var dummyElement = document.createElement("input");
      dummyElement.setAttribute("maxlength", 8);
      expect(Main.maxLengthAchieved(dummyElement)).toBe(false);
    });
    it("returns false if the value of the element is shorter than maxlength", function () {
      var dummyElement = document.createElement("input");
      dummyElement.setAttribute("maxlength", 8);
      dummyElement.value = "shorter";
      expect(Main.maxLengthAchieved(dummyElement)).toBe(false);
    });
    it("returns true if the value of the element is longer than maxlength", function () {
      var dummyElement = document.createElement("input");
      dummyElement.setAttribute("maxlength", 8);
      dummyElement.value = "definitelyLonger";
      expect(Main.maxLengthAchieved(dummyElement)).toBe(true);
    });
  });

});
