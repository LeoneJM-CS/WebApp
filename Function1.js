const name1 = bname =>{
    console.log(`Hello, ${bname}!`);
}
name1("Joel Leone");    

global.setTimeout(() => {
    console.log("This message is displayed after 2 seconds.");
    clearInterval(intfunct); // This will stop the interval after 2 seconds
}, 2000);

const intfunct = setInterval(() => {
    console.log("This message is displayed every 1 seconds.");
}, 1000);
// C:\Users\LeoneJM\VSC\Church Page