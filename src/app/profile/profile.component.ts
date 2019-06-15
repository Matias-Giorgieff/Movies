import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User ;

  constructor(private userServices: UserService,
              private authenticationService: AuthenticationService) { 
    // Traigo parametro
    //this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.authenticationService.getStatus().subscribe(
      (status) => {
        if(status.uid){
          this.userServices.getUserById(status.uid).valueChanges().subscribe(
            (data: User) => {
              this.user = data;
              console.log(this.user);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }  
    
  ngOnInit() {
    
  }
  saveSettings(){
    this.userServices.editUser(this.user).then(
      () => {
        alert('Cambios guardados')
      }
    ).catch(
      (error) => {
        alert('Hubo un error');
        console.log(error);
      }
    );
  }
}
