import { Component, OnInit } from '@angular/core';
import { CodeWeaveService } from 'src/app/code-weave.service';
import { StorageService } from 'src/app/storage.service';
import { CodeWeaveModel } from 'src/app/models/code-weave-model';
import { map, filter, switchMap, debounceTime } from 'rxjs/operators';
import { Observable, Subject, ReplaySubject, from, of, range, observable } from 'rxjs';
import { WeaveSet } from './models/weave-set';
import { WeaveSetManagerService } from './weave-set-manager.service';

@Component({
  selector: 'cw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CodeWeaveService, StorageService, WeaveSetManagerService]
})
export class AppComponent implements OnInit {
  constructor(
    private _storageService: StorageService,
    private _codeWeaveService: CodeWeaveService,
    private _weaveSetManagerService: WeaveSetManagerService
  ) {}

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
      .pipe(debounceTime(500)) // Debounce here so that the UI updates after a period of time
      .subscribe({
        next: value => this.Weave()
      });

    this.Weave();
  }

  addWeaveSet() {
    let maxWeaveSetLength = 0;

    for (let i = 0; i < this.model.WeaveSets.length; i++) {
      if (maxWeaveSetLength < this._weaveSetManagerService.GetSwapValues(this.model.WeaveSets[i]).length) {
        maxWeaveSetLength = this._weaveSetManagerService.GetSwapValues(this.model.WeaveSets[i]).length;
      }
    }

    this.model.WeaveSets.push(new WeaveSet('Substitution', []));

    this.SaveToStorage();
    this.modelChange();
  }

  deleteWeaveSet(item: WeaveSet) {
    const index: number = this.model.WeaveSets.indexOf(item);
    if (index !== -1) {
      this.model.WeaveSets.splice(index, 1);

      this.SaveToStorage();
      this.modelChange();
    }
  }

  modelChange() {
    this.subject.next(this.model);
  }

  // SwapOrder() {
  //   this.modelChange();
  //   const values = this.model.WeaveValues.split('\n');
  //   const newValues = this._codeWeaveService.SwapOrder(values);
  //   let newWeaveValues = '';

  //   for (let i = 0; i < newValues.length; i++) {
  //     newWeaveValues += newValues[i];

  //     // Add a new line if this is not the last line
  //     if (i < newValues.length - 1) {
  //       newWeaveValues += '\n';
  //     }
  //   }

  //   this.model.WeaveValues = newWeaveValues;
  // }

  Weave() {
    this.SaveToStorage();

    this.result = this._codeWeaveService.WeaveWithSets(this.model.Take, this.model.WeaveSets);
  }

  SaveToStorage() {
    this._storageService.setCodeWeaveModel(this.model);
  }
}
