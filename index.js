window.addEventListener("load", () => {
  const numButtons = document.querySelectorAll(".wButton");
  const opButtons = document.querySelectorAll(".rButton");
  const eqButton = document.querySelector(".eButton");
  const numDisplay = document.querySelector(".numDisplay");
  const opArray = ["add", "subtract", "multiply", "divide"];
  let currentString = "";
  //This should always have STRING data. numDisplay, despite the name, should also always have STRING data.
  let firstNum = "";
  //This should always have NUMBER data, OR a BLANK STRING (bad practice - figure out a better solution later).
  let currentOp = "";
  //This is STRING.
  let clearState = "ac";
  //This is STRING.
  let errLock = false;
  //This is BOOLEAN.

  function clearCheck() {
    //There's gotta be a more elegant way of doing this, right?
    if (currentString != "") {
      clearState = "c";
      opButtons[5].textContent = clearState;
    } else {
      clearState = "ac";
      opButtons[5].textContent = clearState;
    }
  }

  function rounder(num) {
    //This function accepts NUMBER data and returns STRING data.
    if (Math.abs(num) > 999999999 || Math.abs(num) < 0.00000001) {
      return num.toExponential(5);
    } else {
      let n = 10 - num.toString().split(".")[0].match(/\d/g).length;
      //line 16 reads as follows: "Subtract the number of digits to the left of the decimal point from 10"
      return parseFloat(num.toFixed(n)).toString();
    }
  }

  function equation() {
    if (currentOp == "add") {
      currentString = firstNum + Number(currentString);
      numDisplay.textContent = rounder(Number(currentString));
      firstNum = Number(currentString);
      currentOp = "";
      currentString = "";
    } else if (currentOp == "subtract") {
      currentString = firstNum - Number(currentString);
      numDisplay.textContent = rounder(Number(currentString));
      firstNum = Number(currentString);
      currentOp = "";
      currentString = "";
    } else if (currentOp == "multiply") {
      currentString = firstNum * Number(currentString);
      numDisplay.textContent = rounder(Number(currentString));
      firstNum = Number(currentString);
      currentOp = "";
      currentString = "";
    } else if (currentOp == "divide") {
      if (Number(currentString) == 0) {
        numDisplay.textContent = "Error";
        firstNum = "";
        currentOp = "";
        currentString = "";
        errLock = true;
      } else {
        currentString = firstNum / Number(currentString);
        numDisplay.textContent = rounder(Number(currentString));
        firstNum = Number(currentString);
        currentOp = "";
        currentString = "";
      }
    } else {
      return;
    }
  }

  for (let n = 0; n <= 9; n++) {
    numButtons[n].addEventListener("click", () => {
      if (errLock == true) {
        errLock = false;
        currentString = numButtons[n].textContent;
        numDisplay.textContent = currentString;
        clearCheck();
      } else if (currentString == "") {
        currentString = numButtons[n].textContent;
        numDisplay.textContent = currentString;
        clearCheck();
      } else if (currentString == "" || currentString == "0") {
        currentString = numButtons[n].textContent;
        numDisplay.textContent = currentString;
        clearCheck();
      } else if (currentString.match(/\d/g).length < 10) {
        //If the currentString contains less than 10 digits (excluding decimal point and negative sign)
        currentString = currentString + numButtons[n].textContent;
        numDisplay.textContent = currentString;
        clearCheck();
      } else {
        currentString = currentString + numButtons[n].textContent;
        clearCheck();
        //Else, we will continue to add digits to the currentString, but NOT to the actual display (out of room)
      }
    });
  }

  numButtons[10].addEventListener("click", () => {
    if (errLock == true) {
      errLock = false;
      currentString = "0" + numButtons[10].textContent;
      numDisplay.textContent = currentString;
      clearCheck();
    } else if (currentString.includes(".")) {
      return;
    } else if (currentString == "") {
      currentString = "0" + numButtons[10].textContent;
      numDisplay.textContent = currentString;
      clearCheck();
    } else {
      currentString = currentString + numButtons[10].textContent;
      numDisplay.textContent = currentString;
      clearCheck();
    }
  });

  numButtons[11].addEventListener("click", () => {
    if (errLock == true) {
      return;
    } else if (currentString == "" && firstNum != "") {
      currentString = (firstNum * -1).toString();
      numDisplay.textContent = rounder(Number(currentString));
      firstNum = Number(currentString);
      currentOp = "";
      currentString = "";
      clearCheck();
    } else {
      currentString = (Number(currentString) * -1).toString();
      numDisplay.textContent = rounder(Number(currentString));
      firstNum = Number(currentString);
      currentOp = "";
      currentString = "";
      clearCheck();
    }
  });

  for (let n = 0; n <= 3; n++) {
    opButtons[n].addEventListener("click", () => {
      if (errLock == true) {
        return;
      } else if (firstNum != "" && currentOp != "" && currentString != "") {
        equation();
        currentOp = opArray[n];
        clearCheck();
      } else if (firstNum != "" && currentString == "") {
        currentOp = opArray[n];
        clearCheck();
      } else {
        firstNum = Number(currentString);
        currentOp = opArray[n];
        currentString = "";
        clearCheck();
      }
    });
  }

  opButtons[4].addEventListener("click", () => {
    if (errLock == true) {
      return;
    } else if (
      Number(currentString) < 0 ||
      (currentString == "" && firstNum < 0)
    ) {
      numDisplay.textContent = "Error";
      firstNum = "";
      currentOp = "";
      currentString = "";
      errLock = true;
      clearCheck();
    } else if (currentString == "" && firstNum != "") {
      currentString = Math.sqrt(firstNum).toString();
      numDisplay.textContent = rounder(Number(currentString));
      firstNum = Number(currentString);
      currentOp = "";
      currentString = "";
      clearCheck();
    } else {
      currentString = Math.sqrt(Number(currentString)).toString();
      numDisplay.textContent = rounder(Number(currentString));
      firstNum = Number(currentString);
      currentOp = "";
      currentString = "";
      clearCheck();
    }
  });

  opButtons[5].addEventListener("click", () => {
    if (clearState == "ac") {
      numDisplay.textContent = "0";
      firstNum = "";
      currentOp = "";
      currentString = "";
      errLock = false;
      clearCheck();
    } else if (clearState == "c") {
      numDisplay.textContent = "0";
      currentString = "";
      errLock = false;
      clearCheck();
    }
  });

  eqButton.addEventListener("click", () => {
    if (firstNum == "" && currentString == "") {
      return;
    } else if (firstNum == "" && currentString != "") {
      numDisplay.textContent = currentString;
      clearCheck();
    } else if (firstNum != "" && currentString != "") {
      equation();
      clearCheck();
    }
  });
});
