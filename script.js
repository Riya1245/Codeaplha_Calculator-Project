const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = null;

function updateDisplay() {
  display.value = currentInput || "0";
}

function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = "";
}

function handleInput(key) {
  if (!isNaN(key) || key === ".") {
    if (key === "." && currentInput.includes(".")) return;
    currentInput += key;
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    if (currentInput === "") return;
    if (previousInput) calculate();
    operator = key;
    previousInput = currentInput;
    currentInput = "";
  } else if (key === "=" || key === "Enter") {
    if (!previousInput || !currentInput) return;
    calculate();
  } else if (key === "C") {
    currentInput = "";
    previousInput = "";
    operator = null;
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  }

  updateDisplay();
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");
    handleInput(key);
  });
});

document.addEventListener("keydown", (e) => {
  if (
    !isNaN(e.key) ||
    ["+", "-", "*", "/", ".", "Enter", "=", "Backspace", "C", "c"].includes(e.key)
  ) {
    handleInput(e.key.toUpperCase());
  }
});

updateDisplay();
