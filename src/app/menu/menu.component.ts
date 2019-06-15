import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user: User;
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {   
  }
  ngOnInit() {
  }
  // Cierro Sesion
  logout(){
    this.authenticationService.logOut().then(() => {
      alert('Sesion Cerrada');
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
