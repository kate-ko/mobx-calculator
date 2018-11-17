import { observable, action } from "mobx";
import math from 'mathjs';


class CalculatorStore {
  @observable screen = "";
  @observable result = "";
  numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  operators = ['+', '-', '*', '/', '%']
  currentSymbol = "" // last entered symbol
  zeroFlag = 0; // if number starts with zero
  onlyNumberFlag = 1; // don't show result if it's only one number
  maxNum = 20; // maximum number of digits on the screen
  minusFlag = -1; // if '+/-' button was clicked index of "minus", not clicked '-1'

  @action clickButton = (value) => {
    switch (true) {
      // equal
      case (value === "=" && this.numbers.includes(this.currentSymbol)):
        this.screen = this.evalScreen();
        this.result = ""
        this.currentSymbol = "1";
        this.onlyNumberFlag = 1;
        break;

      // clear
      case (value === "C"):
        this.screen = "";
        this.result = "";
        this.currentSymbol = "";
        this.onlyNumberFlag = 1;
        break;

      case (this.screen.length >= this.maxNum && value !== "+/-"):
        break;

      // number
      case this.numbers.includes(value):
        if (this.zeroFlag) {
          this.screen = this.screen.slice(0, this.screen.length - 1);
        }
        this.addToScreen(value);
        this.result = !this.onlyNumberFlag ? this.evalScreen() : "";
        this.currentSymbol = value;
        this.zeroFlag = (value === '0' && (this.operators.includes(this.currentSymbol) || this.currentSymbol === "")) ? 1 : 0;
        break;

      // operator
      case (this.operators.includes(value) && this.numbers.includes(this.currentSymbol)):
        this.screen += value;
        this.result = "";
        this.currentSymbol = value;
        this.zeroFlag = 0;
        this.onlyNumberFlag = 0;
        this.minusFlag = -1;
        break;


      // point or %
      case ((value === ".") && this.numbers.includes(this.currentSymbol)):
        this.screen += value;
        this.result = !this.onlyNumberFlag ? this.evalScreen() : "";
        this.currentSymbol = value;
        break;

      // +/-
      case (value === "+/-"):
        let lastSymbolIndex = this.screen.length - 1;
        // switch to minus
        if (this.minusFlag === -1 && this.screen.length <= (this.maxNum - 2)) {
          let i = lastSymbolIndex;
          // Going over the string, looking for the first operator
          while (!this.operators.includes(this.screen[i]) && i !== 0) {
            i--;
          }
          // there is operator in the string before ...+135345
          if (i !== 0) {
            let lastNumber = this.screen.slice(i + 1, this.screen.length);
            this.screen = this.screen.slice(0, i + 1) + "(-" + lastNumber + ")";
          }
          // no operator, only one number
          else {
            this.screen = "(-" + this.screen + ")";
          }
          this.minusFlag = i;
        }
        // remove minus
        else {
          let i = this.minusFlag;
          if (i !== 0) {
            let first = this.screen.slice(0, i + 1);
            let second = this.screen.slice(i + 3, this.screen.length);
            second = second.replace(")", "");
            this.screen = first + second;
          }
          else {
            this.screen = this.screen.replace(/(\(-|\))/g, "");
          }
          this.minusFlag = -1;
        }
        this.result = !this.onlyNumberFlag && this.minusFlag !== lastSymbolIndex ? 
        this.evalScreen() : "";
        break;

      default: ;
    }

  }

  evalScreen() {
    let screen = (this.eval(this.screen)).toString();
    console.log(screen)
    return screen.length <= this.maxNum ? screen : "Number too big";
  }

  eval(str) {
    try {
      let result = math.eval(str.replace(/%/g, "/100*"));
      return result;
    }
    catch {
      return "Oops!Smt went wrong :(";
    }
  }

  addToScreen(value) {
    if (this.minusFlag === -1) {
      this.screen += value;
    }
    else {
      this.screen = this.screen.slice(0, this.screen.length - 1) + value + ")";
    }
  }

}

export default CalculatorStore;