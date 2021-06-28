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
        this.changeState(new clearState(self.fsm))
        this.runningTotal = 0;
        this.curOp = null;
        this.num1 = "";
        this.num2 = "";
        display.value = "";
        subDisplay.value = "";
    }

}
let calculator = new Calculator();

const display = document.querySelector(".disp");
const subDisplay = document.querySelector(".subDisp");
const Buttons = document.querySelectorAll("button");
Buttons.forEach(button => {
    button.addEventListener('click',() => calculator.state.handle(button));
})


function alreadyHasDecimal(val){
    let has = true;
    if(!val.includes(".")){
        has = false;
    }
    return has;
}



function clearState(_fsm){
    let self = this;
    this.fsm = _fsm;

    this.handle = function handle(e){

        if((parseInt(e.innerText) >= 0 && parseInt(e.innerText) <= 9) || e.innerText == ".")
            {
                display.value = e.innerText;
                self.fsm.num1 += e.innerText;
                self.fsm.changeState(new state1(self.fsm));
                
        }
    }
}


function state1(_fsm){
    let self = this;
    this.fsm = _fsm;
    this.handle = function handle(e){
        if(parseInt(e.innerText) >= 0 && parseInt(e.innerText) <= 9 || e.innerText == "."){
            if(alreadyHasDecimal(self.fsm.num1) && e.innerText == "."){
                return;
            }
            self.fsm.num1 += e.innerText;
            display.value = self.fsm.num1;
        }
        else if(e.innerText == "/" || e.innerText == "+" || e.innerText == "-" || e.innerText == "*"){
            self.fsm.curOp = e.innerText;
            display.value = e.innerText;
            self.fsm.changeState(new state2(self.fsm));
        }
        else if (e.innerText == "AC"){
            self.fsm.clear();
        }

    }
}

function state2(_fsm){
    let self = this;
    this.fsm = _fsm;
    this.handle = function handle(e){
        if((parseInt(e.innerText) >= 0 && parseInt(e.innerText) <= 9) || e.innerText == "."){
            if(alreadyHasDecimal(self.fsm.num2)  && e.innerText == "."){
                return;
            }
            self.fsm.num2 += e.innerText;
            display.value = self.fsm.num2;
        }
        else if((e.innerText == "/" || e.innerText == "+" || e.innerText == "-" || e.innerText == "*") && self.fsm.num2 != ""){
            display.value = e.innerText;
            self.fsm.operate();
            self.fsm.curOp = e.innerText;
            self.fsm.num1 = self.fsm.runningTotal;
            self.fsm.changeState(new state2(self.fsm));
        }
        else if(e.innerText == "=" && self.fsm.num2 != ""){
            
            self.fsm.operate();
            self.fsm.changeState(new evalState(self.fsm));
        }
        else if (e.innerText == "AC"){
            self.fsm.clear();
        }
    }
}

function evalState(fsm){
    let self = this;
    this.fsm = fsm;
    
    this.handle = function handle(e){
        if (e.innerText == "AC"){
            self.fsm.clear();
        }
        else if(parseInt(e.innerText) >= 0 && parseInt(e.innerText) <= 9 || e.innerText == "."){
            display.value = e.innerText;
            self.fsm.num1 = e.innerText;
            self.fsm.changeState(new state1(self.fsm));
        }
        else if(e.innerText == "/" || e.innerText == "+" || e.innerText == "-" || e.innerText == "*"){
            display.value = e.innerText;
            self.fsm.num1 = self.fsm.runningTotal;
            self.fsm.curOp = e.innerText;
            self.fsm.changeState(new state2(self.fsm));
        }
    }

}


