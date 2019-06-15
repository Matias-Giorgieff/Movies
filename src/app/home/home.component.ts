import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { GeneroService } from '../services/genero.service';
import { FavoritosService } from '../services/favoritos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //friends: User[];
  query: string = '';
  btnFavoritos: string = '';
  peliculasAnimation: any = null;
  peliculasAction: any = null;
  peliculasDrama: any = null;
  peliculaHtml: any;
  eliminarFavoritosHTML: any;
  peliculaFavoritos: any[] = [];
  bddIds: any;
  user: User ;
  prueba : any;
  estado: string;
  constructor(private userServices: UserService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private generoService: GeneroService,
              private favoritosService: FavoritosService) {

                
    // Toda la lista de usuarios
    // userServices.getUsers().valueChanges().subscribe(
    //  (data: User[]) => {
    //    this.friends = data;
    //  }, (error) => {
    //    console.log(error);  
    //  }
    //) ;

    // Obtengo usuario logeado
    this.authenticationService.getStatus().subscribe(
      (status) => {
        this.authenticationService.getStatus().subscribe(
      (status) => {
        if(status){
          //this.user = status;
          this.userServices.getUserById(status.uid).valueChanges().subscribe(
            (data: User) => {
                this.user = data;
                this.estado = this.user.estado;
                //this.listarFavoritosF();
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
      },
      (error) => {
        console.log(error);
      }
    );

    // Obtengo peliculas por genero
    this.generoService.obtenerPeliculasPorGenero('animation').subscribe(
      (resultado) => {
        this.peliculasAnimation = resultado;
        
      },
      (error) => {
        console.log('error service');
        
      }
    );
    this.generoService.obtenerPeliculasPorGenero('drama').subscribe(
      (resultado) => {
        this.peliculasDrama = resultado;
        
      },
      (error) => {
        console.log('error service');
        
      }
    );
    this.generoService.obtenerPeliculasPorGenero('action').subscribe(
      (resultado) => {
        this.peliculasAction = resultado;
        
      },
      (error) => {
        console.log('error service');
        
      }
    );
  }

  ngOnInit() {
    this.btnFavoritos = "far fa-star";
  }


  onOpenModal(peli: any){
    this.peliculaHtml = peli;
  }


  onOpenModalFavorito(peli: any){
    this.eliminarFavoritosHTML = peli;
  }


  addFavoritos(peli: any){
    // Ya tengo la pelicula y el usuario
    console.log(this.user);
    
    this.favoritosService.ListarIdsFavoritos(this.user.uid).subscribe(
      (ids) => {
        let valid = null;
        ids.forEach((tmp) => {
          if(tmp.id_movie == peli.imdb_code){
            alert("Pelicula ya agregada a favoritos");
            valid = "X";
          }
        });
        if(!valid){
          this.favoritosService.addFavoritos(this.user.uid, peli.imdb_code).subscribe(
            (pelicula) => {
              this.listarFavoritosF();
              alert("Pelicula agregada a favoritos correctamente");
            },
            (error) => {
              console.log('error service');
              
            }
          ); 
        }
      },
      (error) => {
        console.log('error service');        
      }
    );

  }


  deleteFavoritos(peli: any){
    this.bddIds.forEach((tmp) => {
      if(tmp.id_movie == peli.imdbID){
        console.log(tmp.id_movie);

        this.favoritosService.deleteFavoritos(tmp.id).subscribe(
          (value) => {
            console.log(value);
            this.listarFavoritosF();
            alert("Pelicula eliminada de favoritos correctamente");
          }, 
          (error) => {
            console.log(error);
          }
        );
      }
    });

  }

  listarFavoritosF(){
    if(this.user.uid){
    this.favoritosService.ListarIdsFavoritos(this.user.uid).subscribe(
      (ids) => {
        console.log(ids);
        this.bddIds = ids;
        console.log("ListarIdsFavoritos");
        this.peliculaFavoritos = [];
        ids.forEach((tmp) => {
          this.favoritosService.ListarFavoritos(tmp.id_movie).subscribe(
            (peliculas: any) => {
              console.log("Listar");
              this.peliculaFavoritos.push(peliculas);
            },
            (error) => {
              console.log(error);
            }
          )
        });
      },
      (error) => {
        console.log('error service');        
      }
    );
    }
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
