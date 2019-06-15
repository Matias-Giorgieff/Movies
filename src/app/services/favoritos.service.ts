import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  constructor( private httpClient: HttpClient ) { };

  addFavoritos(uid: string, peliculaId: string): Observable<any> {
    return this.httpClient.get("http://api.conectati.cl/index.php/movieRest2/addFavorito/"+uid+"/"+peliculaId);
  }
  ListarIdsFavoritos(uid: string): Observable<any> {
    return this.httpClient.get("http://api.conectati.cl/index.php/movieRest2/listaFavorito/"+uid);
  }
  ListarFavoritos(id: string): Observable<any> {
    return this.httpClient.get("http://api.conectati.cl/index.php/movieRest/busquedaPorId/"+id);
  }
  deleteFavoritos(id: string): Observable<any> {
    return this.httpClient.get("http://api.conectati.cl/index.php/movieRest2/deleteFavorito/"+id);
  }

}

