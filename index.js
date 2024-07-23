window.addEventListener("load", () => {
  const numButtons = document.querySelectorAll(".wButton");
  const opButtons = document.querySelectorAll(".rButton");
  const eqButton = document.querySelector(".eButton");
  const numDisplay = document.querySelector(".numDisplay");
  const opArray = ["add", "subtract", "multiply", "divide"];
  let currentString = numDisplay.textContent;

  let currentNum = Number(currentString);
  let firstNum = "";
  let currentOp = "";
  let memNum = "";

  for (let n = 0; n <= 9; n++) {
    numButtons[n].addEventListener("click", () => {
      if (currentString.length <= 10) {
        numDisplay.textContent = currentString + numButtons[n].textContent;
        currentString = numDisplay.textContent;
        currentNum = Number(currentString);
      } else {
        return;
      }
    });
  }

  numButtons[10].addEventListener("click", () => {
    if (currentString.includes(".")) {
      return;
    } else {
      numDisplay.textContent = currentString + numButtons[10].textContent;
      currentString = numDisplay.textContent;
      currentNum = Number(currentString);
    }
  });

  numButtons[11].addEventListener("click", () => {
    if (currentString.includes("-")) {
      currentNum = Number(currentString) * -1;
      numDisplay.textContent = currentNum.toString();
      currentString = numDisplay.textContent;
    } else {
      numDisplay.textContent = "-" + currentString;
      currentString = numDisplay.textContent;
      currentNum = Number(currentString);
    }
  });

  for (let n = 0; n <= 3; n++) {
    opButtons[n].addEventListener("click", () => {
      firstNum = Number(numDisplay.textContent);
      currentOp = opArray[n];
      numDisplay.textContent = "";
      currentString = numDisplay.textContent;
      currentNum = Number(currentString);
    });
  }
  opButtons[5].addEventListener("click", () => {
    numDisplay.textContent = "";
    currentString = numDisplay.textContent;
    currentNum = Number(currentString);
    firstNum = "";
    currentOp = "";
  });

  eqButton.addEventListener("click", () => {
    if (firstNum == "" && currentString == "") {
      return;
    } else if (firstNum == "" && currentString != "") {
      numDisplay.textContent = currentString;
    } else if (firstNum != "" && currentString != "") {
      if (currentOp == "add") {
        numDisplay.textContent = (firstNum + currentNum)
          .toString()
          .substring(0, 10);
        currentString = numDisplay.textContent;
        currentNum = Number(currentString);
        firstNum = "";
        currentOp = "";
      } else if (currentOp == "subtract") {
        numDisplay.textContent = (firstNum - currentNum)
          .toString()
          .substring(0, 10);
        currentString = numDisplay.textContent;
        currentNum = Number(currentString);
        firstNum = "";
        currentOp = "";
      } else if (currentOp == "multiply") {
        numDisplay.textContent = (firstNum * currentNum)
          .toString()
          .substring(0, 10);
        currentString = numDisplay.textContent;
        currentNum = Number(currentString);
        firstNum = "";
        currentOp = "";
      } else if (currentOp == "divide") {
        numDisplay.textContent = (firstNum / currentNum)
          .toString()
          .substring(0, 10);
        currentString = numDisplay.textContent;
        currentNum = Number(currentString);
        firstNum = "";
        currentOp = "";
      } else {
        numDisplay.textContent = "32202!";
      }
    }
  });
});
