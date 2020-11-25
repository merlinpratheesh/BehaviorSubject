import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  constructor(public auth: AngularFireAuth, private db: AngularFirestore){}
  login() {
    return this.auth.signInWithPopup( new (firebase.auth as any).GoogleAuthProvider());
  }
  logout() {
    return this.auth.signOut();
  }
  /*getDocumentData(projectname:string, mainfield: string, subfield: string): any {
    const collectionPath= projectname + '/' + mainfield + '/TestItems/'+ subfield;  
    const myDocRef = this.db.firestore.doc(collectionPath);            
    return doc(myDocRef);
  }*/

  deletearraybyindex(item: string): any {
    return  this.db.collection<any>('KeysListCollection').doc(item).delete();
  }
  



  getDocumentData(projectname:string, mainfield: string, subfield: string): any {
    const collectionPath= projectname + '/' + mainfield + '/TestItems/'+ subfield;  
    return doc(this.db.firestore.doc(collectionPath)).pipe(
      map(changes => ({ ...changes.data() })
      ));
      //angularfire/rxfire/firebase native
  }
}
