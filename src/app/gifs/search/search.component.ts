import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  search( ) {

    const valor = this.txtSearch.nativeElement.value;
    console.log( valor );
    this.txtSearch.nativeElement.value = '';

  }
  

}
