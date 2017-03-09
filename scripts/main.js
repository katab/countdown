(function () {

  var firstInput = document.getElementById("from-date"),
      secondInput = document.getElementById("to-date");

  firstInput.onkeyup = function(e) {
    onkeyupInternal(firstInput, secondInput);
  };

  secondInput.onkeyup = function(e) {
    onkeyupInternal(firstInput, secondInput);
  };

  function onkeyupInternal(firstInput, secondInput) {
    if (maxLengthAchieved(firstInput) && maxLengthAchieved(secondInput)) {
      var result = DateHelper.countDown(firstInput.value, secondInput.value);
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
    document.activeElement.blur(); // To hide virtual keypad
  }

  function deleteResult() {
    var message = document.getElementById("message");
    if (message == null) return;

    var output = document.getElementById("output");
    output.removeChild(message);

    var form = document.getElementById("form");
    form.setAttribute("class", "center");
  }
})();
