import { Component } from '@angular/core';
import { UserdataService, TestDocument, TestArray, TestMapString, TestMapArray,SomeDocument } from './service/userdata.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  loggedin = false;
  Componentvar: TestDocument | undefined;
  Componentvar1: string[] | undefined;
  Componentvar2: TestMapString | undefined;
  Componentvar3: TestMapArray | undefined;

  subAuth: Subscription;
  myarraydisplay: [] = [];
  mysubDocRead: Subscription | undefined;
  myitemsdisplay: Observable<TestDocument> | undefined;
  myitemsdisplayArray: Observable<TestArray> | undefined;
  mymapstring: Observable<TestMapString> | undefined;
  mymaparray: Observable<TestMapArray> | undefined;

  title: any;
  constructor(public afAuth: AngularFireAuth, public tutorialService: UserdataService) {

    this.subAuth = this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.loggedin = true;
        this.myitemsdisplay = this.tutorialService.getDocumentPath('TestCollection', 'TestId').pipe(take(1));

        this.mysubDocRead = this.myitemsdisplay.subscribe(testdataSubscribed => {
          this.Componentvar = testdataSubscribed;

          if (testdataSubscribed !== null) {
            for (const fieldkey in testdataSubscribed) {
              console.log(fieldkey, testdataSubscribed[fieldkey]);//keys & values              
            }
            console.log(this.Componentvar?.TestField)
          }
        });

        this.myitemsdisplayArray = this.tutorialService.getDocumentPathNew('TestCollectionArray', 'TestArray').pipe(take(1));
        this.mysubDocRead = this.myitemsdisplayArray.subscribe(testdataSubscribedNew => {

          this.Componentvar1 = testdataSubscribedNew.ArrayList;
          if (testdataSubscribedNew !== null) {
            for (let i = 0; i < this.Componentvar1.length; i++) {
              console.log(this.Componentvar1[i]);
            }
            this.Componentvar1.forEach((value) => {
              console.log(value);
            });
          }
        });

        this.mymapstring = this.tutorialService.getMapStringPathMap('TestCollectionMap', 'TestMap').pipe(take(1));
        this.mysubDocRead = this.mymapstring.subscribe(testdataSubscribedMap => {

          this.Componentvar2 = testdataSubscribedMap;
          if (testdataSubscribedMap !== null) {
            for (const fieldkeymap in testdataSubscribedMap) {
              console.log(fieldkeymap, testdataSubscribedMap[fieldkeymap]);//keys & values              
            }
            console.log(this.Componentvar2?.Name);

          }
        });

        this.mymaparray = this.tutorialService.getArrayMap('TestCollectionArrayMap', 'TestMap').pipe(take(1));
        this.mysubDocRead = this.mymaparray.subscribe(testdataSubscribedArrayMap => {

          this.Componentvar3 = testdataSubscribedArrayMap;
          if (testdataSubscribedArrayMap !== null) {
              for (const fieldmap in testdataSubscribedArrayMap) {
            console.log(fieldmap, testdataSubscribedArrayMap[fieldmap]);//keys & values              
          }
          console.log(this.Componentvar3?.FirstName);
        }
        });

      } else {
        this.loggedin = false;
      }
    });

  }

  ngOnDestroy() {
    this.subAuth.unsubscribe();
  }
}