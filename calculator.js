const btn = document.querySelectorAll('button');
const displayValue = document.querySelector('.display-value');

btn.forEach(btn => btn.addEventListener("click", () => {
    inputValue(btn.textContent);
}));

window.addEventListener("keydown", keyboardInput);

function keyboardInput(e) {
    const keys = document.querySelectorAll(`.key`);
    if(e.key == 'Backspace') {
        inputValue('\u232B');
    }
    keys.forEach(key => {
        if(e.key == key.textContent) {
            inputValue(key.textContent);
        }        
    });   
};

function inputValue(content) {
    if(content == 'C') {
        displayValue.textContent = '';
    }
    else if(content == '.') {
        const splitDisplay = displayValue.textContent.split(/[/*-+]/);
        if(!(splitDisplay[splitDisplay.length-1].includes('.')) && splitDisplay[splitDisplay.length-1] != '') {
            displayValue.textContent += content;
        }
    }
    else if(content == '=') {
        const calc = new Calculator();
        displayValue.textContent = calc.operate(displayValue.textContent);
    }
    else if(content == '\u232B') {
        displayValue.textContent = displayValue.textContent.slice(0,displayValue.textContent.length-1);
    }
    else {
        if (/[0-9]/.test(content)) {
            displayValue.textContent += content;
        }
        else if(!(/[0-9]/.test(displayValue.textContent.slice(-1)))) {
            displayValue.textContent = displayValue.textContent.slice(0,displayValue.textContent.length-1) + content;
            }
        else {
            displayValue.textContent += content;
        }        
    }
};

function Calculator() {
    this.calculate = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y,
    };

    this.operate = function(str) {
        const strSplit = str.split(/([-+/*])+/);
        while (strSplit.some(item => /[/*]/.test(item))) {
           const index = strSplit.findIndex(item => /[/*]/.test(item));
           const eval = this.calculate[strSplit[index]](Number(strSplit[index-1]), Number(strSplit[index+1]));
           strSplit.splice(index-1,3,Number.isInteger(eval) ? eval : Number.parseFloat(eval).toFixed(3));
        }
        while (strSplit.some(item => item == '+' || item == '-')) {
            const index = strSplit.findIndex(item => item == '+' || item == '-');
            const eval = this.calculate[strSplit[index]](Number(strSplit[index-1]), Number(strSplit[index+1]));
            strSplit.splice(index-1,3,Number.isInteger(eval) ? eval : Number.parseFloat(eval).toFixed(3));
         }
        return strSplit[0];
    };
};
