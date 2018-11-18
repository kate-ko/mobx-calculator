import { observable, action } from "mobx";
import math from 'mathjs';


class CalculatorStore {
  @observable screen = "";
  @observable result = "";
  numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  operators = ['+', '-', '*', '/', '%']
  currentSymbol = "" // last entered symbol
  zeroFlag = 0; // if number starts with zero
  onlyNumberFlag = 1; // don't show result if it's only one number on the screen
  maxNum = 21; // maximum number of digits on the screen
  minusIndex = -1; // if '+/-' button was clicked before index of "(-", not clicked '-1'

  @action clickButton = (value) => {
    switch (true) {
      // equal
      case (value === "=" && this.numbers.includes(this.currentSymbol)):
        this.screen = this.evalScreen();
        this.result = ""
        this.currentSymbol = "1";
        this.onlyNumberFlag = 1;
        this.minusIndex = -1;
        break;

      // clear
      case (value === "C"):
        this.screen = "";
        this.result = "";
        this.currentSymbol = "";
        this.onlyNumberFlag = 1;
        this.minusIndex = -1;
        break;

      // if there is no place on the screen
      case (this.screen.length >= this.maxNum && !(value === "+/-" && this.minusIndex !== -1)):
        break;

      // number
      case this.numbers.includes(value):
        if (this.zeroFlag) {
          this.screen = this.screen.slice(0, this.screen.length - 1);
        }
        this.addToScreen(value);
        this.result = this.evalScreen();
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
        this.minusIndex = -1;
        break;


      // point or %
      case ((value === ".") && this.numbers.includes(this.currentSymbol)):
        this.screen += value;
        this.result = this.evalScreen();
        this.currentSymbol = value;
        break;

      // +/-
      case (value === "+/-"):
        // add minus
        if (this.minusIndex === -1) {
          // if not enough space
          if (this.screen.length > (this.maxNum - 3)) {
            break;
          }
          // if screen was empty or it had only one number
          else if (this.screen.length === 0 || this.onlyNumberFlag) {
            this.screen = "(-" + this.screen + ")";
            this.minusIndex = 0;
          }
          // if screen ends with operator
          else if (this.operators.includes(this.screen[this.screen.length - 1])) {
            this.minusIndex = this.screen.length;
            this.screen += "(-)";
          }
          else {
            let i = this.screen.length - 1;
            // Going over the string backwards, looking for the first operator 
            // after which to put parentheses
            while (!this.operators.includes(this.screen[i]) && i !== 0) {
              i--;
            }
            let lastNumber = this.screen.slice(i + 1, this.screen.length);
            this.screen = this.screen.slice(0, i + 1) + "(-" + lastNumber + ")";
            this.minusIndex = i + 1;
            this.result = this.evalScreen();
          }
        }
        // remove minus
        else {
          if (this.minusIndex !== 0) {
            let first = this.screen.slice(0, this.minusIndex);
            let second = this.screen.slice(this.minusIndex + 2, this.screen.length);
            second = second.replace(")", "");
            this.screen = first + second;
          }
          else {
            this.screen = this.screen.replace(/(\(-|\))/g, "");
          }
          this.minusIndex = -1;
          this.result = this.numbers.includes(this.currentSymbol) ? this.evalScreen() : "";
        }
        break;
      default: ;
    }

  }

  evalScreen() {
    if (this.onlyNumberFlag) {
      return "";
    }
    let screen = (this.eval(this.screen)).toString();
    return screen.length <= this.maxNum ? screen : "Number too big";
  }

  eval(str) {
    try {
      let result = math.eval(str.replace(/%/g, "/100*")); // for %
      return result;
    }
    catch {
      return "Oops!Smt went wrong :(";
    }
  }

  addToScreen(value) {
    if (this.minusIndex === -1) {
      this.screen += value;
    }
    else {
      this.screen = this.screen.slice(0, this.screen.length - 1) + value + ")";
    }
  }

}

export default CalculatorStore;