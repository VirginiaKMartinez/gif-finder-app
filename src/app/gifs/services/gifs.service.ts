import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //esto lo que hace es que nuestro servicio esté accesible de manera global en total la applicación y por eso no hay que importarlo en el app.module.
                    //si lo importáramos en un módulo, solamente sería accesible esa info en ese módulo.
})
export class GifsService {

  private _historic: string[] = [];

  get historic() {
    return [...this._historic];
  }


  searchGifs( query: string ) {
    this._historic.unshift( query );
    console.log(this._historic);
    
  }
}
