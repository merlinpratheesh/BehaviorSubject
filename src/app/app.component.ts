import { ChangeDetectorRef, Component } from '@angular/core';
import { UserdataService } from './service/userdata.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

const getObservable = (collection: AngularFirestoreCollection<any>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: any[]) => {
    subject.next(val);
  });
  return subject;
};



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
 


  constructor(public afAuth: AngularFireAuth, public tutorialService: UserdataService , public cd: ChangeDetectorRef , private db: AngularFirestore) {

    this.subAuth = this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.loggedin = true;
        this.myitemsdisplay=this.tutorialService.getDocumentData('TestAngular','TestMain', 'TestSub').pipe(take(1));
        
      } else {
        this.loggedin = false;
      }
    });
    this.subAuth = this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.userid = res.uid;
        this.loggedin = true;
        this.myitemsdisplaycoll =getObservable(this.db.collection('KeysListCollection',ref => ref.orderBy('Project')));
      }
  });
}


ngOnDestroy() {
 this.subAuth.unsubscribe();
}
}
