import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';

export interface TestDocument{
  TestField: string; 
  TestFieldNext: string; 
}
export interface TestArray{
 
 ArrayList: string[]; 
}
export interface TestMapString{
  Name: string;
  Place:string;
 }

 export interface TestMapArray{
  FirstName(FirstName: any);

  TestMap : SomeDocument[];
}
 export interface SomeDocument{
  FirstName:string;
  LastName:string;
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
    return this.db.doc<TestArray>(collectionPath).valueChanges();   
  }
  getMapStringPathMap(collectionName:string, documentId: string){
    const collectionPath= collectionName + '/' + documentId ;   
    return this.db.doc<TestMapString>(collectionPath).valueChanges();   
  }
  getArrayMap(collectionName:string, documentId: string){
    const collectionPath= collectionName + '/' + documentId ;   
    return this.db.doc<TestMapArray>(collectionPath).valueChanges();   
  }
  
}