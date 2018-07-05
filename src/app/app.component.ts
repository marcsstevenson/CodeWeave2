import { Component, OnInit } from '@angular/core';
import { CodeWeaveService } from 'src/app/code-weave.service';
import { StorageService } from 'src/app/storage.service';
import { CodeWeaveModel } from 'src/app/code-weave-model';
import { map, filter, switchMap, debounceTime } from 'rxjs/operators';
import { Observable, Subject, ReplaySubject, from, of, range, observable } from 'rxjs';

@Component({
  selector: 'cw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CodeWeaveService, StorageService]
})
export class AppComponent implements OnInit {
  constructor(
    private _storageService: StorageService,
    private _codeWeaveService: CodeWeaveService,
  ) { }

  index = '<i>';
  title = 'cw';
  Take: string;
  result: string;
  model: CodeWeaveModel;
  subject: Subject<CodeWeaveModel> = new Subject<CodeWeaveModel>();

  ngOnInit() {
    this.model = this._storageService.getCodeWeaveModel();

    const obs = this.subject.asObservable();

    obs
      .pipe(debounceTime(500))
      .subscribe({
        next: value => this.Weave(), // 1
      });

    this.Weave();
  }

  modelChange() {
    console.log(this.model);
    this.subject.next(this.model);
  }

  SwapOrder() {
    console.log('before');
    this.modelChange();
    console.log('after');
    const values = this.model.WeaveValues.split('\n');
    const newValues = this._codeWeaveService.SwapOrder(values);
    let newWeaveValues = '';

    for (let i = 0; i < newValues.length; i++) {
        newWeaveValues += newValues[i] + '\n';
    }

    this.model.WeaveValues = newWeaveValues;
  }

  Weave() {
    // console.log('Weaving');
    this.SaveToStorage();

    // console.log(this.model.Take);
    const values = this.model.WeaveValues.split('\n');
    // let workingValue = '';

    // for (let i = 0; i < values.length; i++) {
    //   workingValue += this._codeWeaveService.ReplaceAll(this.model.Take, this.model.WeaveSubstitution, values[i]) + '\n';
    //     // Swap {{index} for the counter i
    //     workingValue = this._codeWeaveService.ReplaceAll(workingValue, '{{index}}', i);
    // }

    this.result = this._codeWeaveService.Weave(values, this.model.Take, this.model.WeaveSubstitution);
  }

  SaveToStorage() {
    this._storageService.setCodeWeaveModel(this.model);
  }

  // localStorage.setItem("key",value);
}
