
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularFire2/auth';

import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>;
  constructor(private angularFireAuth: AngularFireAuth) {
    
  }
  loginWithEmail(email: string, password: string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  registerWithEmail(email: string, password: string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  //Devuelve sesion de usuario
  getStatus(){
    return this.angularFireAuth.authState;
  }
  logOut(){
    return this.angularFireAuth.auth.signOut();
  }



}
