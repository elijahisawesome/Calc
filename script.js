const nums = document.querySelectorAll(".nums");
const ops = document.querySelectorAll(".ops");
const evaluate = document.querySelector(".eval");
const display = document.querySelector(".disp");
const AC = document.querySelector('.clear');



let prevNum = 0;
let curNum = '';
let curOp;
let prevButton = '';
let operated = false;

const calculator = {
    state : "fresh",
    states: {
        fresh: {
            onEnter: nums.forEach(num => {
                num.addEventListener('click', this.queueNum);
            }),
            queueNum: changeState("accState1", e)
        },
        accState1 : {

        },
        accState2: {

        },
        total: {

        }
    }
}

/*

nums.forEach(num =>{
num.addEventListener('click', queueNum);
});

ops.forEach(op =>{
    op.addEventListener("click", queueOp);
});

evaluate.addEventListener('click', operate);
AC.addEventListener('click', clear);


function add(a,b){
    prevNum = (parseInt(a)+parseInt(b));
    display.value=`${prevNum}`;
}
function subtract(b,a){
    prevNum = (parseInt(a)-parseInt(b));
    display.value=`${prevNum}`;
}
function multiply(a,b){
    prevNum = (parseInt(a)*parseInt(b));
    display.value=`${prevNum}`;
}
function divide(b,a){
    prevNum = (parseInt(a)/parseInt(b));
    display.value=`${prevNum}`;
}

function operate(){
    if(curNum){
    
        switch(curOp){
        
        case "+":
            operated = true;
            add(curNum, prevNum);
            break;
        case "-":
            operated = true;
            subtract(curNum, prevNum);
            break;
        case "*":
            operated = true;
            multiply(curNum, prevNum);
            break;
        case "/":
            operated = true;
            divide(curNum, prevNum);
            break;
        default:
            console.log("Invalid Operator");
            clear();
    }

    curOp = "";
    curNum = '';
    }
}

function queueNum(e){
    let thisNum = e.target.innerText;

    if(prevButton == "" || prevButton == "number"){
        curNum += thisNum;
        display.value=`${thisNum}`;
    }
    else{
        curNum = thisNum;
        display.value=`${thisNum}`;
    }
    prevButton = "number";
}

function queueOp(e){
   if(prevButton == "number" && !(curNum =='') &&(!operated)){
       prevNum = curNum;
       curNum = "";
       console.log("fucg");
       curOp = e.target.innerText;
       
       display.value=`${curOp}`;
   }
   else if(operated) {
        operated = false;
        curOp = e.target.innerText;
        display.value=`${curOp}`;
        curNum = '';
   }
   else if(!operated){
        operate()
        curOp = e.target.innerText;
        display.value=`${curOp}`;
        curNum = '';
   }
   prevButton = "op";

}
*/

function clear(){
    curNum = '';
    runningTotal = 0;
    prevNum = 0;
    curOp = '';
    operated = false;
    display.value = "0";
}