import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //esto lo que hace es que nuestro servicio esté accesible de manera global en total la applicación y por eso no hay que importarlo en el app.module.
                    //si lo importáramos en un módulo, solamente sería accesible esa info en ese módulo.
})
export class GifsService {

  private _apiKey: string = 'k1RlFNP6leEDUbRF1ySW8fC3edqy08TY';

  private _api: string = 'http://api.giphy.com/v1/gifs';

  private _historic: string[] = [];

  public results: Gif[] = [];

  get historic() {
    return [...this._historic];
  }
    
constructor(private http: HttpClient) {
  if( localStorage.getItem( 'historic') ) {
    this._historic = JSON.parse( localStorage.getItem( 'historic' )! ); //En este constructor vamos a coger lo transformado por el JSON sctringify (linea36) y con el parse lo vamos a devolver a su estado original, como array, objeto,.. y lo carga el constructor al inicializarse la app 
  } // el signo de exclamación es para que Typescript confíe en nosotros en que no va a retornar null, como tenemos el tipado muy estricto no da error si no se lo ponemos.

  //otra manera de hacer lo mismo que ese if sería la siguiente en una sola línea:

  // this._historic = JSON.parse( localStorage.getItem( 'historic' )!  ) || [];

  this.results = JSON.parse( localStorage.getItem( 'results' )!  ) || [];  
}

  searchGifs( query: string = '' ) {

    query = query.trim().toLowerCase(); // para que ya escriban la misma busqueda en mayúsculas como minúsculas lo reconozca como duplicado. Lo que hace es eque el resultado de lo que ponen en el input lo pasa todo a minusculas.
    
    if( !this._historic.includes( query ) ) {
      this._historic.unshift( query );
      this._historic = this._historic.splice( 0,9 );
      localStorage.setItem( 'historic', JSON.stringify( this._historic ) ); //aquí lo que hacemos es coger todo el array de búsquedas y almacernarlas en el local Storage para que no se borren cuando la app se actualice o refresquemos el navegaro

    }

  const params = new HttpParams()
        .set( 'api_key', this._apiKey )
        .set( 'limit', '10' )
        .set( 'q', query );

        console.log( params.toString() );
        

    this.http.get<SearchGifsResponse>( `${ this._api }/search`, { params } )
    .subscribe( ( resp: any ) => {
      console.log( resp.data );
      this.results = resp.data;
      localStorage.setItem( 'results', JSON.stringify( this.results ) );

      
    })};
}
