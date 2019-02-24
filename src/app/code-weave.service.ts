import { Injectable } from '@angular/core';
import { WeaveSet } from './models/weave-set';
import { WeaveSetManagerService } from './weave-set-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CodeWeaveService {

  constructor(private _weaveSetManagerService: WeaveSetManagerService) {
  }

  // public Test() {
  //   const weaveSets: WeaveSet[] = [
  //     new WeaveSet('{f}', ['fudge', 'trump', 'rump']),
  //     new WeaveSet('{h}', ['here', 'there'])
  //   ];

  //   const testResult = this.WeaveWithSets('What the {f} is going on {h}', weaveSets);

  //   console.log(testResult);
  // }

  // 2019.03.24 - this is yet to be implemented. It would allow for multi-column code weaves.
  // eg. Take: "What the {f} is going on {h}". Swap {f} with fudge and trump. Swap {h} with here and there.
  // result 1: "What the fudge is going on here" {f} with fudge and {h} with here.
  // result 2: "What the trump is going on there" {f} with trump and {h} with there.
  public WeaveWithSets = function (take: string, weaveSets: WeaveSet[]) {
    let result = '';
    let maxWeaveSetLength = 0;

    for (let i = 0; i < weaveSets.length; i++) {
      console.log(this._weaveSetManagerService.GetSwapValues(weaveSets[i]));

      if (maxWeaveSetLength < this._weaveSetManagerService.GetSwapValues(weaveSets[i]).length) {
        maxWeaveSetLength = this._weaveSetManagerService.GetSwapValues(weaveSets[i]).length;
      }
    }

    // Work down each row within the WeaveValues of each WeaveSets
    // Ignore the WeaveSets if it's WeaveValues.length is < maxWeaveSetLength
    for (let i = 0; i < maxWeaveSetLength; i++) {
      let newLine = take;
      for (let j = 0; j < weaveSets.length; j++) {
        const weaveSet = weaveSets[j];

        if (this._weaveSetManagerService.GetSwapValues(weaveSet).length > i) { // Ignore this weave set if it doesn't cover this row
          newLine = this.ReplaceAll(newLine, weaveSet.SubstitutionValue, this._weaveSetManagerService.GetSwapValues(weaveSet)[i]);
        }
      }

      // Swap {{index}} for the counter i
      newLine = this.ReplaceAll(newLine, '{{index}}', i);
      result += newLine + '\n';
    }

    return result;
  };

  // public Weave = function (take: string, substitutionValue: string, swapValues: string[]) {
  //   let result = '';

  //   for (let i = 0; i < swapValues.length; i++) {
  //     result += this.ReplaceAll(take, substitutionValue, swapValues[i]) + '\n';

  //     // Swap {{index}} for the counter i
  //     result = this.ReplaceAll(result, '{{index}}', i);
  //   }

  //   return result;
  // };

  // public ReplaceSet = function (take: string): string {

  // };

  public ReplaceAll = function (str, find, replace): string {
    if (typeof str === 'undefined' || !str) {
      return '';
    }

    return str.replace(new RegExp(find, 'g'), replace);
  };

  public SwapOrder = function (WeaveValues) {
    const returnArray = [];

    for (let i = WeaveValues.length - 1; i >= 0; i--) {
      returnArray.push(WeaveValues[i]);
    }

    return returnArray;
  };
}
