// Develop a calculator program and display the results based on the choice of operations.
function calculate(num1, num2, operation) {
    switch (operation) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            if (num2 === 0) {
                return 'Cannot divide by zero';
            }
            return num1 / num2;
        default:
            return 'Invalid operation';
    }
}

// Example usage:
// console.log(calculate(5, 3, 'add'));
// console.log(calculate(5, 3, 'subtract'));
// console.log(calculate(5, 503, 'multiply'));
// console.log(calculate(2515, 0, 'divide'));

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the first number: ', (firstInput) => {
    rl.question('Enter the second number: ', (secondInput) => {
        rl.question('Choose operation (add, subtract, multiply, divide): ', (operationInput) => {
            const num1 = Number(firstInput);
            const num2 = Number(secondInput);
            const operation = operationInput.trim().toLowerCase();

            if (Number.isNaN(num1) || Number.isNaN(num2)) {
                console.log('Please enter valid numbers.');
            } else {
                const result = calculate(num1, num2, operation);
                console.log(`Result: ${result}`);
            }

            rl.close();
        });
    });
});
