import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor( private httpClient: HttpClient ) { };

  obtenerPeliculasPorGenero(genero: string): Observable<any> {
    return this.httpClient.get("http://api.conectati.cl/index.php/movieRest/genero/"+genero);
  }
}
