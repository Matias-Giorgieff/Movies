import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { GeneroService } from '../services/genero.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  peliculas: any = null;
  peliculaHtml: any;
  constructor(private userServices: UserService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private generoService: GeneroService) {

     userServices.getUsers().valueChanges().subscribe(
      (data: User[]) => {
        this.friends = data;
      }, (error) => {
        console.log(error);  
      }
    ) ;

    this.generoService.obtenerPeliculasPorGenero().subscribe(
      (resultado) => {
        console.log(resultado);
        this.peliculas = resultado;
        
      },
      (error) => {
        console.log('error service');
        
      }
    );
  }

  ngOnInit() {
    
  }
  onOpenModal(peli: any){
    this.peliculaHtml = peli;
  }

  logout(){
    this.authenticationService.logOut().then(() => {
      alert('Sesion Cerrada');
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
      
    });
  }
}
