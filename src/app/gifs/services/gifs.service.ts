import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //esto lo que hace es que nuestro servicio esté accesible de manera global en total la applicación y por eso no hay que importarlo en el app.module.
                    //si lo importáramos en un módulo, solamente sería accesible esa info en ese módulo.
})
export class GifsService {

  private _api: string = 'k1RlFNP6leEDUbRF1ySW8fC3edqy08TY';

  private _historic: string[] = [];

  public results: any[] = [];

  get historic() {
    return [...this._historic];
  }
    
constructor(private http: HttpClient) {

}

  searchGifs( query: string = '' ) {

    query = query.trim().toLowerCase(); // para que ya escriban la misma busqueda en mayúsculas como minúsculas lo reconozca como duplicado. Lo que hace es eque el resultado de lo que ponen en el input lo pasa todo a minusculas.

    if( !this._historic.includes( query ) ) {
      this._historic.unshift( query );
      this._historic = this._historic.splice( 0,9 );

    }
    this.http.get( `http://api.giphy.com/v1/gifs/search?api_key=k1RlFNP6leEDUbRF1ySW8fC3edqy08TY&q=${ query }&limit=10` )
    .subscribe( ( resp: any ) => {
      console.log( resp.data );
      this.results = resp.data;
      
    })};
}
