import { ChangeDetectorRef, Component,ChangeDetectionStrategy, OnInit, Inject } from '@angular/core';
import { UserdataService } from './service/userdata.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection ,AngularFirestore} from '@angular/fire/firestore';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  loggedin :boolean=undefined;
  loggedinObs:Observable<string>;
  
  subAuth: Subscription;
  myarraydisplay: [] = [];
  myitemsdisplaycoll: Observable<any>;
  myitemsdisplay: Observable<any> | undefined
  userid: string;
  dialogRef;
  constructor(public afAuth: AngularFireAuth, public tutorialService: UserdataService ,public dialog: MatDialog, private db: AngularFirestore, public cd: ChangeDetectorRef ) {
    


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
ngOnInit(){
  this.dialogRef = this.dialog.open(DialogContentloginDialog, {
    //width: '80vw',
   // data:this.loggedin,
    disableClose: true
  });
  this.dialogRef.afterClosed().subscribe(result => {
  });
}
}

@Component({
  selector: 'dialog-content-login-dialog',
  template: `
  <h1>
  hello
  </h1>
  `
})

export class DialogContentloginDialog {
constructor(public dialogRef: MatDialogRef<DialogContentloginDialog>) //@Inject(MAT_DIALOG_DATA) public data: string)
{
  //console.log(this.data);
}
}