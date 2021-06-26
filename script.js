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

//removes focus when buttons are clicked. Needed to enable mixed mouse and keyboard inputs.
document.addEventListener('click', function(e) { if(document.activeElement.toString() == '[object HTMLButtonElement]'){ document.activeElement.blur(); } });
backspace.addEventListener('click', deleteChars);
evaluate.addEventListener('click', operate);
AC.addEventListener('click', clear);
document.addEventListener('keypress', logKey);

nums.forEach(num =>{
    num.addEventListener('click', () => queueNum(num.innerText));
});
ops.forEach(
    op =>{op.addEventListener("click", () => queueOp(op.innerText));
});

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
        clear();
        display.value = "Error! Cannot Divide by 0";
        return;
    }
    runningTotal = (a/b);
}



function operate(){
    if(num2 !== ""){
        prevButton = "=";
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
    }
}

function queueNum(thisNum){
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
    prevbutton = "op";
}

function clear(){
    num1 = '';
    num2 = '';
    runningTotal = 0;
    curOp = null;
    display.value = '';
    subDisplay.value = '';
    prevButton = '';
}