import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor( private gifsService: GifsService ) {}

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  search( ) {

    const searchValue = this.txtSearch.nativeElement.value;
    
    //este if lo que previene es que no puedan dar al enter si el input está vacío, si
    // no se escribió nada . El trim() quita los espacios vacíos de principio y final
    if( searchValue.trim().length === 0 ) { 
      return;
    }

    this.gifsService.searchGifs( searchValue );
    this.txtSearch.nativeElement.value = '';

  }
  

}
