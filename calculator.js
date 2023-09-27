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
    if(e.key == 'c') {
        inputValue('C');
    }
    keys.forEach(key => {
        if(e.key == key.textContent) {
            inputValue(key.textContent);
        }        
    });   
};

function inputValue(content) {
    switch(content) {
        case 'C':
            displayValue.textContent = '';
            break;
        
        case '\u232B':
            displayValue.textContent = displayValue.textContent.slice(0,displayValue.textContent.length-1);
            break;

        case '=':
            if(!(document.querySelector('.history-container'))) {
                const mainContainer = document.querySelector('.main-container');
                const historyDiv = document.createElement('div');
                const historyDivH2 = document.createElement('h2');
                const historyClear = document.createElement('button')
                const historyItems = document.createElement('div');
                historyDiv.setAttribute('class','history-container');
                historyItems.setAttribute('class','history-items');
                historyDiv.setAttribute('style',`height:${getComputedStyle(document.querySelector('.calc-container')).height}`);
                historyDivH2.setAttribute('style', 'margin-left: 110px');
                historyClear.setAttribute('style', 'margin-left: 100px');
                historyClear.textContent = 'Clear History';
                historyDivH2.textContent = 'History';
    
                historyClear.addEventListener('click', () => {
                    while (historyItems.firstChild) {
                        historyItems.removeChild(historyItems.lastChild);
                      }
                });
                
                historyDiv.appendChild(historyDivH2);
                mainContainer.appendChild(historyDiv);   
                historyDiv.appendChild(historyClear);  
                historyDiv.appendChild(historyItems);        
            }
            const strSplit = displayValue.textContent.split(/([-+/*])+/);
            if(/[0-9]/.test(strSplit[strSplit.length-1])) {
            const calc = new Calculator();
            const historyDiv = document.querySelector('.history-items');
            const para = document.createElement('p');
            para.setAttribute('style', 'margin: 10px')
            const paraStr = displayValue.textContent;        
            displayValue.textContent = calc.operate(displayValue.textContent);
            para.textContent = paraStr + ' = ' + displayValue.textContent;
            historyDiv.appendChild(para);
            }
            break;

        default:
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
}

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
