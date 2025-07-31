const inputScreen = document.querySelector(".input-screen");
const outputScreen = document.querySelector(".output-screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal-sign");
const clearBtn = document.querySelector(".all-clear");
const decimal = document.querySelector(".decimal");
const deleteBtn = document.querySelector(".delete");
const percentBtn = document.querySelector(".percent");

let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';
let calculationExpression = ''; // To store the full expression for the input screen

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currentNumber = '0';
    calculationExpression = '';
    updateInputScreen(currentNumber);
    updateOutputScreen(''); // Clears the outputScreen
};

const updateInputScreen = (content) => {
    inputScreen.value = content;
};

const updateOutputScreen = (history) => {
    outputScreen.value = history;
};

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
    calculationExpression += number;
    updateInputScreen(calculationExpression);
};

const inputOperator = (operator) => {
    if (prevNumber && calculationOperator && currentNumber !== '0') {
        calculate();
        calculationExpression = prevNumber; // Start new expression with the result
    }

    if (currentNumber !== '0' && prevNumber === '') {
        prevNumber = currentNumber;
    }

    calculationOperator = operator;
    calculationExpression += ` ${operator} `;
    currentNumber = '0';
    updateInputScreen(calculationExpression);
};

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        inputNumber(event.target.value);
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        inputOperator(event.target.value);
    });
});

equalSign.addEventListener('click', () => {
    if (prevNumber && calculationOperator && currentNumber !== '0') {
        updateOutputScreen(calculationExpression);
        calculate();
        updateInputScreen(currentNumber);
        calculationExpression = currentNumber; // The result becomes the start of a new calculation
        prevNumber = '';
        calculationOperator = '';
    }
});

const calculate = () => {
    let result = '';
    const prev = parseFloat(prevNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) return;

    switch (calculationOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentNumber = result.toString();
    prevNumber = result.toString(); // For chained operations
};

clearBtn.addEventListener("click", () => {
    clearAll();
});

const inputDecimal = (dot) => {
    if (currentNumber.includes(".")) {
        return;
    }
    currentNumber += dot;
    calculationExpression += dot;
    updateInputScreen(calculationExpression);
};

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value);
});

deleteBtn.addEventListener("click", () => {
    if (calculationExpression.length > 0) {
        calculationExpression = calculationExpression.slice(0, -1);
        // More complex logic might be needed here to correctly update currentNumber
        // For simplicity, this just updates the expression.
        const parts = calculationExpression.split(/[\+\-\*\/]/);
        currentNumber = parts[parts.length - 1].trim();
    } else {
        currentNumber = '0';
    }
    updateInputScreen(calculationExpression || '0');
});

percentBtn.addEventListener("click", () => {
    if (currentNumber !== '0') {
        const percentValue = (parseFloat(currentNumber) / 100).toString();
        // This part needs to decide how to integrate the percentage into the expression
        // For now, let's just replace the current number with its percentage value
        calculationExpression = calculationExpression.substring(0, calculationExpression.length - currentNumber.length) + percentValue;
        currentNumber = percentValue;
        updateInputScreen(calculationExpression);
    }
});