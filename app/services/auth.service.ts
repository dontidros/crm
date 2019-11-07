import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //AngularFireAuth module connects with firebase beyond the scenes and ask him 
  //what is the space of the authentication (this is Shlomi's explanation - not understandable)
  constructor(private angularFireAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err))
    })
  }

  //check if the user is loged in and collects his/her email
  getAuth() {
    return this.angularFireAuth.authState.pipe(map(auth => auth))
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }


}
