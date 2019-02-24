import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { CodeWeaveModel } from 'src/app/models/code-weave-model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private expectedVersion = 1;
  @LocalStorage() private codeWeaveModel: CodeWeaveModel;

  public getCodeWeaveModel(): CodeWeaveModel {
    let storedValue = this.codeWeaveModel;

    if (storedValue == null
      || storedValue.Version !== this.expectedVersion) {
      storedValue = new CodeWeaveModel();
    }

    return storedValue;
  }

  public setCodeWeaveModel(newValue: CodeWeaveModel) {
    this.codeWeaveModel = newValue;
  }

  constructor() { }
}
