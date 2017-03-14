casper.test.begin("Functional tests for Countdown", 13, function suite(test) {

  var url = "https://katab.github.io/countdown/";
  var placeholderFromDate, placeholderToDate;

  casper.start(url, function() {
    test.assertEquals(this.getCurrentUrl(), url, "The url is " + url);
    test.assertHttpStatus(200, "The HTTP status code is 200")
    test.assertTitle("Countdown", "The title is Countdown");
  });

  casper.then(function() {
    test.assertExists("#form", "The form element exists");
    test.assertExists("#from-date", "The input element 'from date' exists");
    test.assertExists("#to-date", "The input element 'to date' exists");
    test.assertExists("#output", "The div element 'output' exists");
  });

  casper.then(function() {
    placeholderFromDate = casper.evaluate(function() {
      return document.getElementById("from-date").placeholder;
    });

    placeholderToDate = casper.evaluate(function() {
      return document.getElementById("to-date").placeholder;
    });
  });

  casper.then(function() {
    test.assertEquals(placeholderFromDate, "YYYYMMDD", "The 'from date' input placeholder is YYYYMMDD");
    test.assertEquals(placeholderToDate, "YYYYMMDD", "The 'to date' input placeholder is YYYYMMDD");
    casper.sendKeys("#from-date", "20170313");
    casper.sendKeys("#to-date", "20170504");
    test.info("Setting 'from date' to 20170313");
    test.info("Setting 'to date' to 20170504");
    test.assertExists("#message", "The output paragraph 'message' exists");
    var output = casper.fetchText("#message");
    test.assertEquals(output, "52 days left", "Two valid dates generates a correct output message");
  });

  casper.then(function() {
    casper.sendKeys("#to-date", "2017050", {reset: true});
    test.info("Removing one character from the 'to date'")
    test.assertDoesntExist("#message", "The output paragraph 'message' no longer exists");
    casper.sendKeys("#to-date", "20170533", {reset: true});
    test.info("Setting 'to date' to an invalid date")
    var output = casper.fetchText("#message");
    test.assertEquals(output, "Oops invalid dates", "Invalid dates generates a warning message");
  });

  casper.run(function() {
    test.done();
  });
});

/*
$ casperjs test countdown_test.js
*/
