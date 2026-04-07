function calculator(){
    let a = Number(prompt("Enter the first number:"));
    let b = Number(prompt("Enter the second number:"));
    let type = prompt("Enter the type of operation (add, sub, mul, div, fact):").toLowerCase();
    while(type === "add" || type === "sub" || type === "mul" || type === "div" || type === "fact"){
        console.log("numbers entered: ", a, b);
        if (type === "add") {
            add(a, b);
        }
        else if (type === "sub") {
            sub(a, b);
        }
        else if (type === "mul") {
            mul(a, b);
        }
        else if (type === "div") {
            div(a,b);
        }
        else if (type === "fact") {
            console.log("Factorial of " + a + ": ",  factorial(a));
            // console.log("Factorial of b: ", factorial(b));
        }
        else {
            console.log("Invalid operation type.");
        }
        type = prompt("Enter the type of operation (add, sub, mul, div, fact):").toLowerCase();
    }
}
function add(a, b){
    console.log("a + b = ", a + b);
}
function sub(a, b){
    console.log("a - b = ", a - b);
}
function mul(a, b){
    console.log("a * b = ", a * b);
}
function div(a, b){
    if (b !== 0) {
        console.log("a / b = ", a / b);
    } 
    else {
        console.log("Division by zero is not allowed.");
    }
}
function factorial(n) {
    // let n = Number(prompt("Enter a number to calculate its factorial:"));
    if (n <= 0) {
        console.log("cannot do factorial of negative numbers or zero");
        return;
    }
    else if (n === 1) {
        return 1;
    }
    else{
        return n * factorial(n - 1);
    }
}
calculator();
