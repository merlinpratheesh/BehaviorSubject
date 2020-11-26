import { Component } from '@angular/core';
import { UserdataService, TestDocument, TestArrayNew, TestArrayMap } from './service/userdata.service';
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
  Componentvar2: TestArrayMap | undefined;
  subAuth: Subscription;
  myarraydisplay: [] = [];
  mysubDocRead: Subscription | undefined;
  myitemsdisplay: Observable<TestDocument> | undefined;
  myitemsdisplayArray: Observable<TestArrayNew> | undefined;
  myArrayMap: Observable<TestArrayMap> | undefined;
  title: any;
  myitemsdisplayArrayMap: any;

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
        this.myitemsdisplayArrayMap = this.tutorialService.getDocumentArrayMap('TestCollectionArrayMap', 'ArrayMap').pipe(take(1));
        this.mysubDocRead = this.myitemsdisplayArrayMap.subscribe(testdataSubscribedMap => {
          this.Componentvar2 = testdataSubscribedMap;
          if (testdataSubscribedMap !== null) {
            for (const fieldkey in testdataSubscribedMap) {
              console.log(fieldkey, testdataSubscribedMap[fieldkey]);//keys & values              
            }
            
              console.log(this.Componentvar2?.ArrayMapList);
    
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