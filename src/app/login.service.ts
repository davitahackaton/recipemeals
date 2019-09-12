import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { LoginDetails } from './Recipe';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { last } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  constructor(private afs: AngularFirestore,
    private authfs: AngularFireAuth,
    private router: Router) {
  }

  validateUserDetails(formContent) {
    this.authfs.auth.signInWithEmailAndPassword(formContent.value.email, formContent.value.password).then(
      userLogin => {
        if (userLogin) {
          this.router.navigate(['/Home']);
        }
      }).catch(error => {
        this.eventAuthError.next(error);
        return;
      });
  }

  createUser(firstname: string, lastname: string, username: string, email: string, password: string) {
    this.authfs.auth.createUserWithEmailAndPassword(email.trim(), password).
      then(userCred => {
        this.newUser =
          {
            firstname: firstname,
            lastname: lastname,
            email: email.trim(),
            password: password,
            username: username
          };
        userCred.user.updateProfile(
          {
            displayName: firstname + " " + lastname,
          }
        );

        this.insertUser(userCred).then(() => {
          this.router.navigate(['/Home']);
        })
      }).catch(error => {
        console.log(error);
        this.eventAuthError.next(error);
      });
  }

  getUserState() {
    return this.authfs.authState;
  }

  navigateToPatientLandingPage() {
    this.router.navigate(['/Home']);
  }

  logout() {
    this.router.navigate(['']);
    this.authfs.auth.signOut();
  }

  insertUser(userCred: firebase.auth.UserCredential) {
    console.log(userCred.user.uid);
    console.log(this.newUser.lastname);
    return this.afs.doc(`userdetails/${userCred.user.uid}`).set(
      {
        emailid: this.newUser.email,
        firstname: this.newUser.firstname,
        username: this.newUser.username,
        password: this.newUser.password,
        lastname: this.newUser.lastname,
        accounttype: 'patient'
      }
    )
  }
}
