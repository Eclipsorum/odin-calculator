const btn = document.querySelectorAll('button');
const displayValue = document.querySelector('.display-value');

btn.forEach(btn => btn.addEventListener("click", () => {
    displayValue.textContent += btn.textContent;
}))

function Calculator() {
    this.calculate = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y,
    };

    this.operate = function(num1, operator, num2) {
        return this.calculate[operator](num1, num2);
    };
};