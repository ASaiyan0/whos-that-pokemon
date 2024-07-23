window.addEventListener("load", () => {
  const numButtons = document.querySelectorAll(".wButton");
  const opButtons = document.querySelectorAll(".rButton");
  const eqButton = document.querySelector(".eButton");
  const numDisplay = document.querySelector(".numDisplay");
  const opArray = ["add", "subtract", "multiply", "divide"];
  let currentString = numDisplay.textContent;
  let firstNum = "";
  let currentOp = "";
  let errLock = false;

  for (let n = 0; n <= 9; n++) {
    numButtons[n].addEventListener("click", () => {
      if (currentString.length <= 10) {
        if (errLock == true) {
          currentString = "";
          errLock = false;
          currentString = currentString + numButtons[n].textContent;
          numDisplay.textContent = currentString;
        } else {
          currentString = currentString + numButtons[n].textContent;
          numDisplay.textContent = currentString;
        }
      } else {
        return;
      }
    });
  }

  numButtons[10].addEventListener("click", () => {
    if (errLock == true) {
      return;
    } else if (currentString.includes(".")) {
      return;
    } else {
      currentString = currentString + numButtons[10].textContent;
      numDisplay.textContent = currentString;
    }
  });

  numButtons[11].addEventListener("click", () => {
    if (errLock == true || currentString == "" || currentString == ".") {
      return;
    } else if (currentString.length > 10) {
      currentString = (Number(currentString) * -1).toExponential(5);
      numDisplay.textContent = currentString;
    } else {
      currentString = (Number(currentString) * -1).toString();
      numDisplay.textContent = currentString;
    }
  });

  for (let n = 0; n <= 3; n++) {
    opButtons[n].addEventListener("click", () => {
      if (errLock == true) {
        return;
      } else {
        firstNum = Number(currentString);
        currentOp = opArray[n];
        currentString = "";
        numDisplay.textContent = currentString;
      }
    });
  }
  opButtons[4].addEventListener("click", () => {
    if (errLock == true) {
      return;
    } else if (currentString.includes("-")) {
      currentString = "Error";
      numDisplay.textContent = currentString;
      firstNum = "";
      currentOp = "";
      errLock = true;
    } else {
      currentString = Math.sqrt(Number(currentString))
        .toString()
        .substring(0, 10);
      numDisplay.textContent = currentString;
    }
  });

  opButtons[5].addEventListener("click", () => {
    currentString = "";
    numDisplay.textContent = currentString;
    firstNum = "";
    currentOp = "";
    errLock = false;
  });

  eqButton.addEventListener("click", () => {
    if (firstNum == "" && currentString == "") {
      return;
    } else if (firstNum == "" && currentString != "") {
      numDisplay.textContent = currentString;
    } else if (firstNum != "" && currentString != "") {
      if (currentOp == "add") {
        currentString = (firstNum + Number(currentString))
          .toString()
          .substring(0, 10);
        numDisplay.textContent = currentString;
        firstNum = "";
        currentOp = "";
      } else if (currentOp == "subtract") {
        currentString = (firstNum - Number(currentString))
          .toString()
          .substring(0, 10);
        numDisplay.textContent = currentString;
        firstNum = "";
        currentOp = "";
      } else if (currentOp == "multiply") {
        if ((firstNum * Number(currentString)).toString().length > 10) {
          currentString = (firstNum * Number(currentString)).toExponential(5);
        } else {
          currentString = (firstNum * Number(currentString)).toString();
        }
        numDisplay.textContent = currentString;
        firstNum = "";
        currentOp = "";
      } else if (currentOp == "divide") {
        if (Number(currentString) == 0) {
          currentString = "Error";
          numDisplay.textContent = currentString;
          firstNum = "";
          currentOp = "";
          errLock = true;
        } else {
          currentString = (firstNum / Number(currentString))
            .toString()
            .substring(0, 10);
          numDisplay.textContent = currentString;
          firstNum = "";
          currentOp = "";
        }
      } else {
        currentString = "Error";
        numDisplay.textContent = currentString;
        firstNum = "";
        currentOp = "";
        errLock = true;
      }
    }
  });
});
