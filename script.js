console.log('I work!')

class Calculator{
    constructor(lastOperandTextElement, currentOperandTextElement){
        //this will take both values and place them into the calc.//
        this.lastOperandTextElement = lastOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.lastOperand = '';
        this.operation = undefined;

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
       if (this.currentOperand === '') return;
       if (this.lastOperand !== ''){
        this.compute();
       }
        this.operation = operation;
        this.lastOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        console.log("computing:", this.lastOperand, this.operation, this.currentOperand);
        const prev = parseFloat(this.lastOperand);
        const current = parseFloat(this.currentOperand);
        let result;

        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation){
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '÷':
            case '/':
                 if (current === 0){
                    alert("error - cannot divide by 0");
                    return;
                 }
                result = prev / current;
                break;
            default:
                return;
       
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.lastOperand = '';
    }

    getDisplayNum(number) {
        if (number === '') return ''
        const stringNum = number.toString();
        const [integerPart, decimalPart] = stringNum.split('.');
        const integerDisplay = parseFloat(integerPart).toLocaleString('en', {maximumFractionDigits:0});

        if (decimalPart != null){
            return `${ integerDisplay}.${decimalPart}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNum(this.currentOperand);
        if (this.operation != null){
            this.lastOperandTextElement.innerText = `${this.getDisplayNum(this.lastOperand)} ${this.operation}`;
        }else{
            this.lastOperandTextElement.innerText = '';
        }
    }
}

//made variables for all my buttons which I then used data attribute to make sure I separeted the css from js//
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const lastOperandTextElement = document.querySelector('[data-lastOperand]');
const currentOperandTextElement = document.querySelector('[data-currentOperand]');

//now will connect variables to the functions in the class of Calculator//

const calculator = new Calculator(lastOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    console.log('Equals clicked');
    calculator.compute();
    calculator.updateDisplay();

});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

console.log('equalsBtn');
