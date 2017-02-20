
var firstInput = document.getElementById("from-date");
var secondInput = document.getElementById("to-date");

firstInput.onkeyup = function(e) {
  var target = e.target;
  if (maxLengthAchieved(target)) {
    if (maxLengthAchieved(secondInput)) {
      countDown(target, secondInput);
    } else {
      secondInput.focus();
    }
  }
}

secondInput.onkeyup = function(e) {
  var target = e.target;
  if (maxLengthAchieved(target)) {
    if (maxLengthAchieved(firstInput)) {
      countDown(firstInput, target);
    } else {
      firstInput.focus();
    }
  }
}

function maxLengthAchieved(element) {
  var maxLength = parseInt(element.getAttribute("maxlength"), 10); //element.maxlength
  var currentLength = element.value.length;
  return currentLength >= maxLength;
}

function getDateInUtc(dateString) {
  var year = dateString.value.substr(0,4);
  var month = dateString.value.substr(4,2);
  var day = dateString.value.substr(6,2);
  var date = new Date(year, month - 1, day);

  var valid = date && (date.getMonth() + 1 === parseInt(month, 10));
  if (!valid) {
    alert("Oops invalid date!");
    return null;
  } else {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
  }
}

function countDown(from, to) {
  var fromDate = getDateInUtc(from);
  if (fromDate === null) return;
  var fromDateMilliseconds = fromDate.getTime();

  var toDate = getDateInUtc(to);
  if (toDate === null) return;
  var toDateMilliseconds = toDate.getTime();

  var millisecondsPerDay = 1000*60*60*24;
  var diff = (toDateMilliseconds - fromDateMilliseconds) / millisecondsPerDay;

  alert(diff + "  days left!");
}
