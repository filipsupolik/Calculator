let num1 = 0;
let num2 = 0;
let oper = 0;

let add = (a, b) => a + b;
let sub = (a, b) => a - b;
let mul = (a, b) => a * b;
let div = (a, b) => a / b;

let operate = (a, b, operation) => {
  if (operation === "+") {
    add(number1, number2);
  } else if (operation === "-") {
    sub(number1, number2);
  } else if (operation === "*") {
    mul(number1, number2);
  } else if (operation === "/") {
    div(number1, number2);
  }
};
