
var firstInput = document.getElementById("from-date");
var secondInput = document.getElementById("to-date");
var output = document.getElementById("output");
var messageIsDisplayed = false;

firstInput.onkeyup = function(e) {
  var target = e.target;
  if (maxLengthAchieved(target)) {
    if (maxLengthAchieved(secondInput) && messageIsDisplayed == false) {
      countDown(target, secondInput);
    } else if (maxLengthAchieved(secondInput) == false) {
      secondInput.focus();
    }
  } else if (messageIsDisplayed) {
    deleteMessage();
  }
}

secondInput.onkeyup = function(e) {
  var target = e.target;
  if (maxLengthAchieved(target)) {
    if (maxLengthAchieved(firstInput) && messageIsDisplayed == false) {
      countDown(firstInput, target);
    } else if (maxLengthAchieved(firstInput) == false) {
      firstInput.focus();
    }
  } else if (messageIsDisplayed) {
    deleteMessage();
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

  if (fromDate == null || toDate == null)  {
    displayMessage("Oops invalid date");
    return;
  }

  var fromDateMilliseconds = fromDate.getTime();
  var toDateMilliseconds = toDate.getTime();
  var millisecondsPerDay = 1000*60*60*24;
  var diff = (toDateMilliseconds - fromDateMilliseconds) / millisecondsPerDay;

  displayMessage(diff + " days left");
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

function displayMessage(message) {
  var paragraph = document.createElement("p");
  paragraph.id = "message";
  var text = document.createTextNode(message);
  paragraph.appendChild(text);

  var output = document.getElementById("output");
  output.appendChild(paragraph);

  var form = document.getElementById("form");
  form.setAttribute("class", "top");

  messageIsDisplayed = true;
}

function deleteMessage() {
  var parent = document.getElementById("output");
  var child = document.getElementById("message");
  parent.removeChild(child);

  var form = document.getElementById("form");
  form.setAttribute("class", "center");

  messageIsDisplayed = false;
}
