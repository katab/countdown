
var firstInput = document.getElementById("from-date");
var secondInput = document.getElementById("to-date");

firstInput.onkeyup = function(e) {
  onkeyupInternal(firstInput, secondInput);
};

secondInput.onkeyup = function(e) {
  onkeyupInternal(firstInput, secondInput);
};

function onkeyupInternal(firstInput, secondInput) {
  if (maxLengthAchieved(firstInput) && maxLengthAchieved(secondInput)) {
    var result = countDown(firstInput, secondInput);
    displayResult(result);
  } else {
    deleteResult();
  }
}

function maxLengthAchieved(element) {
  var maxLength = parseInt(element.getAttribute("maxlength"), 10);
  var currentLength = element.value.length;
  return currentLength >= maxLength;
}

function countDown(from, to) {
  var fromDate = getDateInUtc(from);
  var toDate = getDateInUtc(to);

  if (fromDate == null || toDate == null) return null;

  var fromDateMilliseconds = fromDate.getTime();
  var toDateMilliseconds = toDate.getTime();
  var millisecondsPerDay = 1000*60*60*24;
  var diff = (toDateMilliseconds - fromDateMilliseconds) / millisecondsPerDay;

  return diff;
}

function getDateInUtc(dateString) {
  var year = dateString.value.substr(0,4);
  var month = dateString.value.substr(4,2);
  var day = dateString.value.substr(6,2);
  var date = new Date(year, month - 1, day);

  var valid = date && (date.getMonth() + 1 == month);
  if (!valid) return null;

  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
}

function displayResult(result) {
  deleteResult();

  var paragraph = document.createElement("p");
  paragraph.id = "message";

  var message;
  if (result == null) {
    message = "Oops invalid dates";
  } else {
    message = result + " days left";
  }

  var text = document.createTextNode(message);
  paragraph.appendChild(text);
  var output = document.getElementById("output");
  output.appendChild(paragraph);

  var form = document.getElementById("form");
  form.setAttribute("class", "top");
}

function deleteResult() {
  var message = document.getElementById("message");
  if (message == null) return;

  var output = document.getElementById("output");
  output.removeChild(message);

  var form = document.getElementById("form");
  form.setAttribute("class", "center");
}
