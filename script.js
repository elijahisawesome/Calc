const nums = document.querySelectorAll(".nums");
const ops = document.querySelectorAll(".ops");
const evaluate = document.querySelector(".eval");
const display = document.querySelector(".disp");
const AC = document.querySelector('.clear');
const subDisplay = document.querySelector(".subDisp");
const backspace = document.querySelector(".backspace");

let num1 = '';
let num2 = '';
let runningTotal = 0;
let curOp = null;
let prevButton = '';

backspace.addEventListener('click', deleteChars);

nums.forEach(num =>{
num.addEventListener('click', preQueueNum);
});

ops.forEach(op =>{
    op.addEventListener("click", queueOp);
});

evaluate.addEventListener('click', operate);
AC.addEventListener('click', clear);

function deleteChars(){
    switch (prevButton){
        case "op": 
            curOp = null;
            break;
        case "number1":
            num1 = "";
            break;
        case "number2":
            num2 = "";
            break;
        case "=":
            return;
        default:
            break;
    }
    display.value = "";

}

function add(a,b){
    runningTotal = parseFloat(a)+parseFloat(b);
}
function subtract(a,b){
    runningTotal = a-b;
}
function multiply(a,b){
    runningTotal = a*b;
}
function divide(a,b){
    if(b == "0"){
        display.value = "Error!";
        return;
    }
    runningTotal = (a/b);
}

document.addEventListener('keypress', logKey);
function logKey(e){
    if((parseInt(e.charCode) >= 48 && parseInt(e.charCode) <= 57) || e.key == "."){
        queueNum(e.key);
    }
    else if (e.key == "/" || e.key == "-" || e.key == "+" || e.key == "*"){
        queueOp(e.key);
    }
    else if(e.key == "Enter"){
        operate();
    }
}

function operate(){
    if(num2 !== ""){

        switch(curOp){
        
        case "+":
            add(num1, num2);
            break;
        case "-":
            subtract(num1, num2);
            break;
        case "*":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);
            break;
        default:
            display.value = "Invalid Operator";
            curOp = null;
            return;
    }
    subDisplay.value=`${runningTotal}`;
    display.value=`${runningTotal}`;
    curOp = null;
    num1 = "";
    num2 = "";
    prevButton = "=";
    }
}
function preQueueNum(e){
    queueNum(e.target.innerText);
}

function queueNum(thisNum){
    //let thisNum = e.target.innerText;

    if(curOp == null){
        if (thisNum == "." && num1.includes(thisNum)){
            return;
        }
        num1 += thisNum;
        display.value = `${num1}`;
        prevButton = "number1";
    }
    else{
        if(thisNum == "." && num2.includes(thisNum)){
            return;
        } 
        num2 += thisNum;
        display.value = `${num2}`;
        prevButton = "number2";
    }
}

function negate(num){

    if(num.includes("-")){
        return num.toString().slice(1);
    }
    return ("-"+num.toString());
    
}

function preQueueOp(e){
    queueOp(e.target.innerText);
}

function queueOp(e){
    //negator
    if(e == "+/-"){
        if(prevButton == "number1"){
            num1 = negate(num1);
            display.value = `${num1}`;
        }
        else if(prevButton =="number2"){
            num2 = negate(num2);
            display.value = `${num2}`;
        }
        else if(prevButton =="="){
            runningTotal*= -1;
            display.value = `${runningTotal}`;
        }

        return;
    }
    //all other operation logic
    if(num1 != '' && num2 != ''){
        operate();
        num1 = runningTotal;
        curOp = e;
        display.value=`${curOp}`;
    }

    else if(num1 != '' && prevButton.includes("number")){
        curOp = e;
        display.value=`${curOp}`;
    }
    else if(prevButton == "="){
        num1 = runningTotal;
        curOp = e;
        display.value=`${curOp}`;
    }
    else if(prevButton.includes("number")){
        curOp = e;
        display.value=`${curOp}`;
    }
    prevbutton = "op";
}

function clear(){
    num1 = '';
    runningTotal = 0;
    num2 = '';
    curOp = null;
    display.value = '';
    subDisplay.value = '';
    prevButton = '';
}