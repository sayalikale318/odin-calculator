const display = document.getElementById("display");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

// Basic Math Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Cannot divide by 0!";
    return a / b;
}

// Operate Function
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return null;
    }
}

function updateDisplay(value) {
    display.textContent = value;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        display.textContent = "";
        shouldResetDisplay = false;
    }

    if (display.textContent === "0")
        display.textContent = number;
    else
        display.textContent += number;
}

function setOperator(operator) {
    if (currentOperator !== null) evaluate();

    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;

    secondNumber = display.textContent;

    let result = operate(currentOperator, firstNumber, secondNumber);

    if (typeof result === "number")
        result = Math.round(result * 1000) / 1000;

    updateDisplay(result);

    currentOperator = null;
    shouldResetDisplay = true;
}

function clearCalculator() {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
}

// Event Listeners
document.querySelectorAll(".number").forEach(button =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

document.querySelectorAll(".operator").forEach(button =>
    button.addEventListener("click", () => setOperator(button.textContent))
);

document.querySelector(".equals")
    .addEventListener("click", evaluate);

document.querySelector(".clear")
    .addEventListener("click", clearCalculator);