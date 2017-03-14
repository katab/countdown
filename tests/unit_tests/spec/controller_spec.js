describe("Controller", function () {

  describe("maxLengthAchieved", function () {
    it("returns false if no element is passed", function () {
      expect(Controller.maxLengthAchieved()).toBe(false);
    });
    it("returns false if the element does not have a 'maxlength' attribute", function () {
      var dummyElement = document.createElement("input");
      expect(Controller.maxLengthAchieved(dummyElement)).toBe(false);
    });
    it("returns false if the element does not have a value", function () {
      var dummyElement = document.createElement("input");
      dummyElement.setAttribute("maxlength", 8);
      expect(Controller.maxLengthAchieved(dummyElement)).toBe(false);
    });
    it("returns false if the value of the element is shorter than maxlength", function () {
      var dummyElement = document.createElement("input");
      dummyElement.setAttribute("maxlength", 8);
      dummyElement.value = "shorter";
      expect(Controller.maxLengthAchieved(dummyElement)).toBe(false);
    });
    it("returns true if the value of the element is longer than maxlength", function () {
      var dummyElement = document.createElement("input");
      dummyElement.setAttribute("maxlength", 8);
      dummyElement.value = "definitelyLonger";
      expect(Controller.maxLengthAchieved(dummyElement)).toBe(true);
    });
  });

});
