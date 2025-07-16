const inputScreen = document.querySelector(".input-screen");
const outputScreen = document.querySelector(".output-screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal-sign")
const clearBtn = document.querySelector(".all-clear")
const decimal = document.querySelector(".decimal")
const deleteBtn = document.querySelector(".delete");
const percentBtn = document.querySelector(".percent");

let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';
let history = ''


const clearAll = ()=> {
 prevNumber = '';
 calculationOperator = '';
 currentNumber = '0';
 history = '' // Reset history string
 updateInputScreen(currentNumber);
 updateOutputScreen(); //Clears the outputScreen
};

const updateInputScreen = (number) => {
    inputScreen.value = number;
};

const updateOutputScreen = () => {
    outputScreen.value = history;
}

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
};

const inputOperator = (operator) => {
    if (calculationOperator === "" ) {
        prevNumber = currentNumber;
    }
    calculationOperator = operator;
    history += `${currentNumber} ${operator}`; //updated here!
    currentNumber = "0"
};


    numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
    inputNumber(event.target.value);
    updateInputScreen(currentNumber);
        });
    });
    
 
    operators.forEach((operator) => {
        operator.addEventListener('click', (event) => {
            inputOperator(event.target.value);
            updateInputScreen(currentNumber);
            updateOutputScreen();
        });
    });


    
    equalSign.addEventListener('click', () => {
        calculate();
        history += `${currentNumber} `;
        updateOutputScreen();
        updateInputScreen(currentNumber);


        prevNumber = '';
        calculationOperator ='';
        
    });

    const calculate = () => {
        let result = ''
        switch (calculationOperator) {
            case '+':
                result = parseFloat (prevNumber) + parseFloat (currentNumber);
                break;
            case '-' :
                result = parseFloat (prevNumber) - parseFloat (currentNumber);
                break;
            case '*':
                result = parseFloat (prevNumber) * parseFloat (currentNumber);
                break;
            case '/' :
                result = parseFloat (prevNumber) / parseFloat (currentNumber);
                break;
            default :
                return;
        }
        currentNumber = result.toString();
        calculationOperator = '';
    };

   
        clearBtn.addEventListener("click", () => {
            clearAll()
        });

    const inputDecimal = (dot) => {
        if(currentNumber.includes (".")) {
            return;
        }
        currentNumber += dot;
    };


    decimal.addEventListener("click", (event) => {
        inputDecimal(event.target.value)
        updateInputScreen(currentNumber)
    });


deleteBtn.addEventListener("click", () => {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1)
    } else {
        currentNumber = '0';
    }
    updateInputScreen(currentNumber);
});


percentBtn.addEventListener("click", () => {
    if (currentNumber !== '0') {
        currentNumber = (parseFloat(currentNumber) / 100).toString();
    }
});
   

