// console.log("Hello");
let str = "";
document.addEventListener("DOMContentLoaded", () => {
  updateResult(str);
});

function updateResult(str) {
  document.getElementById("res").textContent = str;
}

const numArr = Array.from(document.querySelectorAll(".num, .oper"));
numArr.forEach((element) => {
  element.addEventListener("click", (e) => {
    str += e.target.textContent;
    updateResult(str);
  });
});

// Backspace Button
document.getElementById("bkspc").addEventListener("click", () => {
  str = str.substring(0, str.length - 1);
  updateResult(str);
  if (eval(str) != undefined) {
    const errorDiv = document.getElementById("error-msg");
    errorDiv.style.display = "none";
  }
});

// Clear Button
document.getElementById("clear").addEventListener("click", () => {
  // update last eval
  document.getElementById("last-eval").textContent = "";

  //   update result bar
  str = "";
  updateResult(str);
  //   remove error div
  const errorDiv = document.getElementById("error-msg");
  errorDiv.style.display = "none";
});

// Prevent decimal
// if decimal(.dot) is present in str check there should be atleast one operator between the previous .dot
document.getElementById("dot").addEventListener("click", (e) => {
  if (str.includes(".")) {
    let idx = str.lastIndexOf(".");
    // console.log("Str contains dot at last index", idx);
    let checkStr = str.substring(idx, str.length);
    // console.log("Check Str", checkStr);

    if (
      str[str.length - 1] != "." &&
      (checkStr.includes("*") ||
        checkStr.includes("/") ||
        checkStr.includes("+") ||
        checkStr.includes("-"))
    ) {
      str += e.target.textContent;
      updateResult(str);
    }
  } else {
    str += e.target.textContent;
    updateResult(str);
  }
});

// Eval Button
document.getElementById("eval").addEventListener("click", () => {
  //   Update result bar
  let strTemp;
  if (str != "") {
    try {
      strTemp = str;
      str = eval(str).toString();
      //   update last-eval

      document.getElementById("last-eval").textContent = strTemp + "=";
    } catch (error) {
      const errorDiv = document.getElementById("error-msg");
      errorDiv.style.display = "block";
      console.error("Eval String Incorrect");
    }
  }
  updateResult(str);
});
