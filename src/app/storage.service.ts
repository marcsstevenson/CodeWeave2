import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { CodeWeaveModel } from 'src/app/code-weave-model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  @LocalStorage() private codeWeaveModel: CodeWeaveModel;

  public getCodeWeaveModel(): CodeWeaveModel{
    var storedValue = this.codeWeaveModel;

    if(storedValue == null)
      storedValue = new CodeWeaveModel();
    
    return storedValue;
  }

  public setCodeWeaveModel(newValue: CodeWeaveModel){
    this.codeWeaveModel = newValue;
  }

  constructor() { }
}
