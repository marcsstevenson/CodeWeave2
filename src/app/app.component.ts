import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/storage.service';
import { CodeWeaveModel } from 'src/app/code-weave-model';
import { map, filter, switchMap, debounceTime } from 'rxjs/operators';
import { Observable, Subject, ReplaySubject, from, of, range, observable } from "rxjs";

@Component({
  selector: 'cw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StorageService]
})
export class AppComponent implements OnInit {
  constructor(
    private _storageService: StorageService
  ) { }

  Take: string;
  model: CodeWeaveModel;

  ngOnInit() {
    this.model = this._storageService.getCodeWeaveModel();

    // console.log(range(1,5));
    // var ob = new Observable();
    // range(1, 10)
    //   .pipe(debounceTime(1000))
    //   .subscribe(x => console.log(x));

    // console.log(this.model);

    // const node = document.querySelector('input');

    // const one$ = new Observable(observer => {
    //   observer.next(1);
    //   observer.next(2);
    //   observer.next(3);
    //   observer.complete();
    // });

    // one$
    //   .pipe(debounceTime(1000))
    //   .subscribe({
    //     next: value => console.log(value), // 1
    //   });

    const source = new Subject();

    source
      // .subscribe(
      //   (value) => console.log(value),
      //   undefined,
      //   () => console.log("completed; changed back to null")
      // );
      .pipe(debounceTime(1000))
      .subscribe({
        next: value => console.log(value), // 1
      });
      
    source.next(1);
    source.next(2);
    source.next(3);

    this.Weave();
  }

  Weave() {
    this.SaveToStorage();
    // var values = $scope.WeaveValues.split("\n");
    // var result = "";

    // for (var i = 0; i < values.length; i++) {
    //     result += $scope.ReplaceAll($scope.Take, $scope.WeaveSubstitution, values[i]) + "\n";
    //     //Swap {{index} for the counter i
    //     result = $scope.ReplaceAll(result, '{{index}}', i);
    // }

    // $scope.Result = CodeWeaveService.Weave(values, $scope.Take, $scope.WeaveSubstitution);
  }

  SaveToStorage() {
    this._storageService.setCodeWeaveModel(this.model);
  }

  // localStorage.setItem("key",value);
}
