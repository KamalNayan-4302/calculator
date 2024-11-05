document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let firstOperand = null;
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = button.value;

            if (isNumber(value)) {
                currentInput += value;
                display.value = currentInput;
            } else if (isOperator(value)) {
                if (currentInput !== '') {
                    if (firstOperand === null) {
                        firstOperand = parseFloat(currentInput);
                        operator = value;
                        currentInput = '';
                    } else {
                        currentInput = operate(firstOperand, parseFloat(currentInput), operator);
                        display.value = currentInput;
                        firstOperand = parseFloat(currentInput);
                        operator = value;
                        currentInput = '';
                    }
                }
            } else if (value === '=') {
                if (currentInput !== '') {
                    currentInput = operate(firstOperand, parseFloat(currentInput), operator);
                    display.value = currentInput;
                    firstOperand = null;
                    operator = null;
                }
            } else if (value === 'C') {
                currentInput = '';
                firstOperand = null;
                operator = null;
                display.value = '';
            }
        });
    });

    function isNumber(value) {
        return !isNaN(value);
    }

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    function operate(a, b, operator) {
        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                if (b === 0) {
                    return 'Error';
                }
                return (a / b).toString();
            default:
                return 'Error';
        }
    }
});
