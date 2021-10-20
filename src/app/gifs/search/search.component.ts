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

    const valor = this.txtSearch.nativeElement.value;
    this.gifsService.searchGifs( valor );
    this.txtSearch.nativeElement.value = '';

  }
  

}
