import { Injectable } from '@angular/core';
import { WeaveSet } from './models/weave-set';

@Injectable({
  providedIn: 'root'
})
export class WeaveSetManagerService {

  constructor() { }

  public GetSwapValues = function(weaveSet: WeaveSet): string[] {
    return weaveSet.SwapValuesText.split('\n');
  };
}
