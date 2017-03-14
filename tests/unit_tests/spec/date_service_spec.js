describe( "Date Service Library", function () {

  describe( "countDown", function () {
    it("returns null when no arguments are passed", function () {
      expect(DateService.countDown()).toBeNull();
    });
    it("returns null when only one argument is passed", function () {
      expect(DateService.countDown("20170310")).toBeNull();
    });
    /* tried to mock getDateInUtc() for the two following tests
    as they are covered in the getDateInUtc test suite,
    but didn't figure out how to spy on a function from another module */
    it("returns null when date contains non-numeric character (2017022M)", function () {
      expect(DateService.countDown("2017022M", "20170504")).toBeNull();
    });
    it("returns null when non-existing date is passed (Feb 31)", function () {
      expect(DateService.countDown("20170231", "20170504")).toBeNull();
    });
    it("returns the number of days between two valid date strings", function () {
      expect(DateService.countDown("20170213", "20170504")).toEqual(80);
    });
    it("returns a negative number of days when the 'from' date is after the 'to' date", function () {
      expect(DateService.countDown("20170310", "20170303")).toEqual(-7);
    });
  });

  describe( "getDateInUtc", function () {
    it("returns null when no argument is passed", function () {
      expect(DateService.getDateInUtc()).toBeNull();
    });
    it("returns null when date contains non-numeric character (2017022M)", function () {
      expect(DateService.getDateInUtc("2017022M")).toBeNull();
    });
    it("returns null when non-existing date is passed (Feb 31)", function () {
      expect(DateService.getDateInUtc("20170231")).toBeNull();
    });
    it("returns a Date object when a valid date string is passed", function () {
      expect(DateService.getDateInUtc("20170310") instanceof Date).toBe(true);
    });
  });

});
