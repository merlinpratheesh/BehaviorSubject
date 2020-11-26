import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';


export interface TestDocument{
  TestField: string; 
  TestFieldNext: string; 
}
export interface SomeDocument{
  FirstName: string; 
  LastName: string; 

}
export interface TestArrayNew{
 
 ArrayList: string[]; 
}
export interface TestArrayMap{
  ArrayMapList: SomeDocument[]; 
 }

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
  getDocumentPath(collectionName:string, documentId: string){
    const collectionPath= collectionName + '/' + documentId ;   
    return this.db.doc<TestDocument>(collectionPath).valueChanges();   
  }
  getDocumentPathNew(collectionName:string, documentId: string){
    const collectionPath= collectionName + '/' + documentId ;   
    return this.db.doc<TestArrayNew>(collectionPath).valueChanges();   
  }
  getDocumentArrayMap(collectionName:string, documentId: string){
    const collectionPath= collectionName + '/' + documentId ;   
    return this.db.doc<TestArrayMap>(collectionPath).valueChanges();   
  }
}