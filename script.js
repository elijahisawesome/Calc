const nums = document.querySelectorAll(".nums");
const ops = document.querySelectorAll(".ops");
const evaluate = document.querySelector(".eval");
const display = document.querySelector(".disp");
const AC = document.querySelector('.clear');



let num1 = '';
let num2 = '';
let runningTotal = 0;
let curOp = null;
let prevButton = '';





nums.forEach(num =>{
num.addEventListener('click', queueNum);
});

ops.forEach(op =>{
    op.addEventListener("click", queueOp);
});

evaluate.addEventListener('click', operate);
AC.addEventListener('click', clear);


function add(a,b){
    runningTotal = a+b;
    display.value=`${runningTotal}`;
}
function subtract(a,b){
    runningTotal = a-b;
    display.value=`${runningTotal}`;
}
function multiply(a,b){
    runningTotal = a*b;
    display.value=`${runningTotal}`;
}
function divide(a,b){
    runningTotal = (a/b);
    display.value=`${runningTotal.toString().substring(0,9)}`;
}

function processor(){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let len1 = precision(num1);
    let len2 = precision(num2);
    let len;

    if(len1>len2 ? len = len1:len = len2);
    
    return len+1;
}

function precision(a) {
    var e = 1;
    while (Math.round(a * e) / e !== a) e *= 10;
    return Math.log(e) / Math.LN10;
  }

function operate(){
    if(num2){
        processor();
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
            console.log("Invalid Operator");
            clear();
    }

    curOp = null;
    num1 = "";
    num2 = "";
    prevButton = "=";
    }
}

function queueNum(e){
    let thisNum = e.target.innerText;

    
    if(curOp == null){
        if (thisNum == "." && num1.includes(thisNum)){
            return;
        }
        num1 += thisNum;
        display.value = `${num1}`;
    }
    else{
        if(thisNum == "." && num2.includes(thisNum)){
            return;
        } 
        num2 += thisNum;
        display.value = `${num2}`;
    }
    prevButton = "number";
}

function queueOp(e){
    if(num1 != '' && num2 != ''){
        operate();
        num1 = runningTotal;
        curOp = e.target.innerText;
        display.value=`${curOp}`;
    }

    else if(num1 != '' && prevButton == "number"){
        curOp = e.target.innerText;
        display.value=`${curOp}`;
    }
    else if(prevButton == "="){
        num1 = runningTotal;
        curOp = e.target.innerText;
        display.value=`${curOp}`;
    }
    else if(prevButton == "number"){
        curOp = e.target.innerText;
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
    prevButton = '';
}