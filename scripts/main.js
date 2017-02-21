
var firstInput = document.getElementById("from-date");
var secondInput = document.getElementById("to-date");
var output = document.getElementById("output");
var resultIsDisplayed = false;

firstInput.onkeyup = function(e) {
  var target = e.target;
  if (maxLengthAchieved(target)) {
    if (maxLengthAchieved(secondInput) && resultIsDisplayed === false) {
      countDown(target, secondInput);
    } else {
      secondInput.focus();
    }
  } else if (resultIsDisplayed) {
    deleteResult();
  }
}

secondInput.onkeyup = function(e) {
  var target = e.target;
  if (maxLengthAchieved(target)) {
    if (maxLengthAchieved(firstInput) && resultIsDisplayed === false) {
      countDown(firstInput, target);
    } else {
      firstInput.focus();
    }
  } else if (resultIsDisplayed) {
    deleteResult();
  }
}

function maxLengthAchieved(element) {
  var maxLength = parseInt(element.getAttribute("maxlength"), 10); //element.maxlength
  var currentLength = element.value.length;
  return currentLength >= maxLength;
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

  displayResult(diff);
  //output.innerHTML = diff + "  days left";
  //alert(diff + "  days left!");
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

function displayResult(diff) {
  var paragraph = document.createElement("p");
  paragraph.id = "result";

  var text = document.createTextNode(diff + " days left");
  paragraph.appendChild(text);

  var element = document.getElementById("output");
  element.appendChild(paragraph);
  resultIsDisplayed = true;
}

function deleteResult() {
  console.log("Should delete!")
  var parent = document.getElementById("output");
  var child = document.getElementById("result");
  parent.removeChild(child);
  resultIsDisplayed = false;
}
