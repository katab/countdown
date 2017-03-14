var DateHelper = (function () {

  function getDateInUtc(date) {
    if (date == null) return null;

    var year = date.substr(0,4);
    var month = date.substr(4,2);
    var day = date.substr(6,2);
    var dateUtc = new Date(year, month - 1, day);

    var valid = dateUtc && (dateUtc.getMonth() + 1 == month);
    if (!valid) return null;

    dateUtc.setMinutes(dateUtc.getMinutes() - dateUtc.getTimezoneOffset());
    return dateUtc;
  }

  function countDown(fromDate, toDate) {
    if (fromDate == null || toDate == null) return null;

    var fromDateUtc = getDateInUtc(fromDate);
    var toDateUtc = getDateInUtc(toDate);

    if (fromDateUtc == null || toDateUtc == null) return null;

    var fromDateMilliseconds = fromDateUtc.getTime();
    var toDateMilliseconds = toDateUtc.getTime();
    var millisecondsPerDay = 1000*60*60*24;
    var diff = (toDateMilliseconds - fromDateMilliseconds) / millisecondsPerDay;

    return diff;
  }

  return {
    countDown: countDown,
    getDateInUtc: getDateInUtc //return this for unit testing
  };

})();
