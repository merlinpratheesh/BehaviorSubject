import { ChangeDetectorRef, Component } from '@angular/core';
import { UserdataService } from './service/userdata.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection ,AngularFirestore} from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';


const getObservable = (collection: AngularFirestoreCollection<any>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: any[]) => {
    subject.next(val);
  });
  return subject;
};

export interface collectiondoc{
  fruits: string[]
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  loggedin = false;
  subAuth: Subscription;
  myarraydisplay: [] = [];
  myitemsdisplaycoll: Observable<any>;
  myitemsdisplay: Observable<any> | undefined
  userid: string;
  Componentvar : collectiondoc| undefined;
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;


  Testcollection: collectiondoc[]=
  [{
    fruits : ['Apple', 'Orange', 'Banana']

   }
    ];
  fruits: any;


    ngOnInit( ) {  
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );  
    }
  
    private _filter(value: string): string[] 
    {
      const filterValue = value.toUpperCase();
      console.log('myarray', this.Testcollection[0].fruits)
      return this.Testcollection[0].fruits.filter(fruit => fruit.toUpperCase().includes(filterValue));
    }
  

ngOnDestroy() {
 this.subAuth.unsubscribe();
}
}
