import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeWeaveService {

  constructor() { }

  public Weave = function (WeaveValues, Take: string, WeaveSubstitution) {
    var result = "";

    for (var i = 0; i < WeaveValues.length; i++) {
      result += this.ReplaceAll(Take, WeaveSubstitution, WeaveValues[i]) + "\n";

      //Swap {{index} for the counter i
      result = this.ReplaceAll(result, '{{index}}', i);
    }

    return result;
  };

  public ReplaceAll = function (str, find, replace) {
    if (typeof str === 'undefined' || !str)
      return '';

    return str.replace(new RegExp(find, 'g'), replace);
  }

  public SwapOrder = function (WeaveValues) {
    var returnArray = []

    for (var i = WeaveValues.length - 1; i >= 0; i--) {
      returnArray.push(WeaveValues[i]);
    }

    return returnArray;
  }
}
