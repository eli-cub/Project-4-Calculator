const screen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('button');
let firstNumber = null;
let operator = null;
let newNumber = true;

function calculate(a, b, operation) {
  if (operation === '+') return a + b;
  if (operation === '-') return a - b;
  if (operation === '×') return a * b;
  if (operation === '÷') return b === 0 ? NaN : a / b;
}

function clearCalculator() {
  screen.textContent = '0';
  firstNumber = null;
  operator = null;
  newNumber = true;
}

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    const value = button.textContent;

    if (value === 'C') {
      clearCalculator();
      return;
    }

    if (value >= '0' && value <= '9') {
      if (screen.textContent === 'Error') clearCalculator();
      if (newNumber || screen.textContent === '0') {
        screen.textContent = value;
      } else {
        screen.textContent += value;
      }
      newNumber = false;
      return;
    }

    if (screen.textContent === 'Error') return;

    if (value === '←') {
      if (!newNumber) {
        screen.textContent = screen.textContent.slice(0, -1) || '0';
      }
      return;
    }

    // Finish the previous operation before starting another one.
    const currentNumber = Number(screen.textContent);
    if (operator !== null && !newNumber) {
      const result = calculate(firstNumber, currentNumber, operator);
      if (!Number.isFinite(result)) {
        clearCalculator();
        screen.textContent = 'Error';
        return;
      }
      screen.textContent = String(Number(result.toPrecision(12)));
    }

    if (value === '=') {
      firstNumber = null;
      operator = null;
    } else {
      firstNumber = Number(screen.textContent);
      operator = value;
    }
    newNumber = true;
  });
});
