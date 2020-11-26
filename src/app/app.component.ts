import { ChangeDetectorRef, Component } from '@angular/core';
import { UserdataService } from './service/userdata.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection ,AngularFirestore} from '@angular/fire/firestore';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

const getObservable = (collection: AngularFirestoreCollection<any>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: any[]) => {
    subject.next(val);
  });
  return subject;
};
export interface SomeDocument{
  FirstName : String;
  LastName : String;
  Place : String;
}


export interface collectiondoc{
  Details: SomeDocument[];
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

  Testcollection: collectiondoc[]=
  [
    {
     Details : [{
                  FirstName : 'Merlin',
                  LastName : 'Pratheesh',
                  Place : 'Nagercoil'
     },
     {
      FirstName : 'Merlin',
      LastName : 'Pratheesh',
      Place : 'Nagercoil'
      }
    ]
  },
  {
    Details : [{
                 FirstName : 'Manoj',
                 LastName : 'Isaac',
                 Place : 'Chennai'
    }]
 }
];


  constructor(public afAuth: AngularFireAuth, public tutorialService: UserdataService , private db: AngularFirestore, public cd: ChangeDetectorRef ) {

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
        //this.myitemsdisplaycoll =getObservable(this.db.collection('KeysListCollection',ref => ref.orderBy('Project')));
      }
  });
  /*
           // this.Componentvar= collectiondoc;
            for (let i = 0; i < this.Testcollection.length; i++) {
              console.log("Display the Doc-mapArray obj from a Collection", this.Testcollection[i]);//returns map obj
              for (let j=0; j < this.Testcollection[i].Details.length; j ++){
                console.log("Display the mapArray obj from a document", this.Testcollection[i].Details[j]);//returns  obj value
                for( const key in this.Testcollection[i].Details[j] ){
                  console.log('Key value in Doc', key);//key value
                }
              }
              for( const key in this.Testcollection[i] ){
                console.log('Key value in Doc', key);//key value
              }
             
              
            }*/
            this.Testcollection.forEach(doc=>{
              console.log('doc', doc);
              for(const mapdockey in doc){
                console.log('doc-key', mapdockey, 'dockey- value', doc[mapdockey]);
              }
              doc.Details.forEach(mapdoc=>{
                console.log('mapdoc', mapdoc);
                for(const mapdockey in mapdoc){
                  console.log('mapdoc-key', mapdockey, 'mapdockey- value', mapdoc[mapdockey]);
                }
              });              
            });
          
      
}


ngOnDestroy() {
 this.subAuth.unsubscribe();
}
}
