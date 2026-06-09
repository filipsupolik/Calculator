const display = document.querySelector('.display');

let currentInput = '0';
let previousValue = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function calculate(a, b, operation) {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b === 0 ? 'Error' : a / b;
    default:
      return b;
  }
}

function appendDigit(value) {
  if (currentInput === 'Error') {
    currentInput = value;
  } else if (waitingForSecondOperand) {
    currentInput = value;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === '0' ? value : currentInput + value;
  }

  updateDisplay();
}

function appendDecimal() {
  if (currentInput === 'Error') {
    currentInput = '0.';
  } else if (waitingForSecondOperand) {
    currentInput = '0.';
    waitingForSecondOperand = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }

  updateDisplay();
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (previousValue === null) {
    previousValue = inputValue;
  } else if (operator) {
    const result = calculate(previousValue, inputValue, operator);
    currentInput = String(result);
    previousValue = result;
  }

  operator = nextOperator;
  waitingForSecondOperand = true;
  updateDisplay();
}

function handleEquals() {
  if (operator === null || waitingForSecondOperand) {
    return;
  }

  const inputValue = parseFloat(currentInput);
  currentInput = String(calculate(previousValue, inputValue, operator));
  previousValue = null;
  operator = null;
  waitingForSecondOperand = true;
  updateDisplay();
}

function clearAll() {
  currentInput = '0';
  previousValue = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function deleteLast() {
  if (waitingForSecondOperand) {
    return;
  }

  if (currentInput.length <= 1) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }

  updateDisplay();
}

updateDisplay();

document.querySelectorAll('.button.digit').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.textContent.trim() === '.') {
      appendDecimal();
    } else {
      appendDigit(button.textContent.trim());
    }
  });
});

document.querySelectorAll('.button.operation').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.textContent.trim() === '=') {
      handleEquals();
    } else {
      handleOperator(button.textContent.trim());
    }
  });
});

document.querySelector('.opClear').addEventListener('click', clearAll);
document.querySelector('.opDel').addEventListener('click', deleteLast);
