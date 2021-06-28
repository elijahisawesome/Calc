class Calculator{
    self = this;
    num1 = "";
    num2 = "";
    curOp = null;
    state = null;
    runningTotal = 0;

    constructor(){
        this.state = new clearState(this);
    }
    changeState(newState){
        this.state = newState;
    }
    operate(){
        switch(this.curOp){
    
            case "+":
                this.add();
                break;
            case "-":
                this.subtract();
                break;
            case "*":
                this.multiply();
                break;
            case "/":
                this.divide();
                break;
            default:
                display.value = "Invalid Operator";
                curOp = null;
                return;
            }
            this.num1 = this.num2;
            this.num2 = "";
            this.curOp = null;
            subDisplay.value = this.runningTotal;
            
    }
    add(){
        this.runningTotal = parseFloat(this.num1) + parseFloat(this.num2);
        display.value = this.runningTotal
    }
    subtract(){
        this.runningTotal = this.num1-this.num2;
        display.value = this.runningTotal;
    }
    multiply(){
        this.runningTotal = this.num1*this.num2;
        display.value = this.runningTotal;
    }
    divide(){
        if(this.num2 == "0"){
            this.clear();
            display.value = "Error! Cannot Divide by 0";
            return;
        }
        this.runningTotal = (this.num1/this.num2);
    }
    clear(){
        this.changeState(new clearState(this))
        this.runningTotal = 0;
        this.curOp = null;
        this.num1 = "";
        this.num2 = "";
        display.value = "";
        subDisplay.value = "";
    }

}
let calculator = new Calculator();

document.addEventListener('click', function(e) { if(document.activeElement.toString() == '[object HTMLButtonElement]'){ document.activeElement.blur(); } });
const display = document.querySelector(".disp");
const subDisplay = document.querySelector(".subDisp");
const Buttons = document.querySelectorAll("button");
document.addEventListener('keypress', keyPress);
Buttons.forEach(button => {
    button.addEventListener('click',() => calculator.state.handle(button.innerText));
})
function keyPress(e){
    calculator.state.handle(e.key);
}

function alreadyHasDecimal(val){
    let has = true;
    if(!val.includes(".")){
        has = false;
    }
    return has;
}
function negate(num){
    if(num.includes("-")){
        return num.toString().slice(1);
    }
    return ("-"+num.toString());
}


function clearState(_fsm){
    let self = this;
    this.fsm = _fsm;

    this.handle = function handle(e){

        if((parseInt(e) >= 0 && parseInt(e) <= 9) || e == ".")
            {
                display.value = e;
                self.fsm.num1 += e;
                self.fsm.changeState(new state1(self.fsm));
                
        }
    }
}


function state1(_fsm){
    let self = this;
    this.fsm = _fsm;
    this.handle = function handle(e){
        if(parseInt(e) >= 0 && parseInt(e) <= 9 || e == "."){
            if(alreadyHasDecimal(self.fsm.num1) && e == "."){
                return;
            }
            self.fsm.num1 += e;
            display.value = self.fsm.num1;
        }
        else if(e == "/" || e == "+" || e == "-" || e == "*"){
            self.fsm.curOp = e;
            display.value = e;
            self.fsm.changeState(new opState(self.fsm));
        }
        else if (e == "AC"){
            self.fsm.clear();
        }
        else if (e == "BK"){
            self.fsm.num1 = "";
            display.value = "";
        }
        else if (e == "+/-"){
            self.fsm.num1 = negate(self.fsm.num1);
            display.value = self.fsm.num1;
        }

    }
}

function opState(_fsm){
    let self = this;
    this.fsm = _fsm;
    this.handle = function handle(e){
        if(parseInt(e) >= 0 && parseInt(e) <= 9 || e == "."){
            self.fsm.num2 = e;
            display.value = e;
            self.fsm.changeState(new state2(self.fsm));
        }
        else if(e == "/" || e == "+" || e == "-" || e == "*"){
            self.fsm.curOp = e;
            display.value = e;
        }
        else if (e == "BK"){
            self.fsm.curOp = null;
            display.value = "";
        }
        else if (e == "AC"){
            self.fsm.clear();
        }
    }
}

function state2(_fsm){
    let self = this;
    this.fsm = _fsm;
    this.handle = function handle(e){
        if((parseInt(e) >= 0 && parseInt(e) <= 9) || e == "."){
            if(alreadyHasDecimal(self.fsm.num2)  && e == "."){
                return;
            }
            self.fsm.num2 += e;
            display.value = self.fsm.num2;
        }
        else if((e == "/" || e == "+" || e == "-" || e == "*") && self.fsm.num2 != ""){
            self.fsm.operate();
            display.value = e;
            self.fsm.curOp = e;
            self.fsm.num1 = self.fsm.runningTotal;
            self.fsm.changeState(new opState(self.fsm));
        }
        else if(e == "=" && self.fsm.num2 != ""){
            self.fsm.operate();
            self.fsm.changeState(new evalState(self.fsm));
        }
        else if (e == "AC"){
            self.fsm.clear();
        }
        else if (e == "BK"){
            self.fsm.num2 = "";
            display.value = "";
        }
        else if (e == "+/-"){
            self.fsm.num2 = negate(self.fsm.num2);
            display.value = self.fsm.num2;
        }
    }
}

function evalState(fsm){
    let self = this;
    this.fsm = fsm;
    
    this.handle = function handle(e){
        if (e == "AC"){
            self.fsm.clear();
        }
        else if(parseInt(e) >= 0 && parseInt(e) <= 9 || e == "."){
            display.value = e;
            self.fsm.num1 = e;
            self.fsm.changeState(new state1(self.fsm));
        }
        else if(e == "/" || e == "+" || e == "-" || e == "*"){
            display.value = e;
            self.fsm.num1 = self.fsm.runningTotal;
            self.fsm.curOp = e;
            self.fsm.changeState(new opState(self.fsm));
        }
        else if(e == "BK"){
            self.fsm.clear();
        }
        else if (e == "+/-"){
            self.fsm.runningTotal *= -1;
            display.value = self.fsm.runningTotal;
        }
    }

}