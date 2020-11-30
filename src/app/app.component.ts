import { ChangeDetectorRef, Component,ChangeDetectionStrategy } from '@angular/core';
import { UserdataService } from './service/userdata.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection ,AngularFirestore} from '@angular/fire/firestore';
import { fas } from '@fortawesome/free-solid-svg-icons';

const getObservable = (collection: AngularFirestoreCollection<any>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: any[]) => {
    subject.next(val);
  });
  return subject;
};



@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  loggedin :boolean=undefined;
  loggedinObs:Observable<string>;
  
  subAuth: Subscription;
  myarraydisplay: [] = [];
  myitemsdisplaycoll: Observable<any>;
  myitemsdisplay: Observable<any> | undefined
  userid: string;
  constructor(public afAuth: AngularFireAuth, public tutorialService: UserdataService , private db: AngularFirestore, public cd: ChangeDetectorRef ) {
    
    this.loggedinObs=this.afAuth.authState.pipe(
      map(
        (mapvalue:any) => {

          console.log('mapvalue', mapvalue);
          if(mapvalue !== null)
          {
          return 'login has happened';
          }
          else{
            return 'logout has happened';
          }
        }
      )
      
    );

    this.subAuth = this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.loggedin = true;
        
      } else {
        this.loggedin = false;
      }
    });

}


ngOnDestroy() {
 this.subAuth.unsubscribe();
}
}
