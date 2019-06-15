import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  operation: string = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;
  constructor(public authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router ) {


   }
  onGoogle(){
    console.log("google");
  }
  login(){
    this.authenticationService.loginWithEmail(this.email, this.password).then(
      (data) => {
        alert('Logeado Correctamente');
        console.log(data.user.uid);
        this.router.navigate(['home']);
      }
    ).catch(
      (error) => { 
        alert('Ocurrio un Error')
        console.log(error);
      }
    );
    

  }

  register(){
    this.authenticationService.registerWithEmail(this.email, this.password).then(
      (data) => {
        
        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick,
          estado: "activo"
        };
        console.log(user);
        
        this.userService.createUser(user).then(
          (data2) => {
            alert('Registrado Correctamente');
            console.log(data2);
            this.router.navigate(['home']);
          }
        ).catch(
          (error2) => {
            alert('Ocurrio un Error')
            console.log(error2);
          }
        );
      }
    ).catch(
      (error) => { 
        alert('Ocurrio un Error')
        console.log(error);
      }
    );
  }
}
