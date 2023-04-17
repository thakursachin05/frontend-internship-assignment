import { Component, Input } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-table-view-searchbar',
  templateUrl: './table-view-searchbar.component.html',
  styleUrls: ['./table-view-searchbar.component.scss'],
})
export class TableViewSearchbarComponent {
  @Input() booksList: Book[] = [];
  @Input() searchInput: string = '';
  @Input() tableSize : number = 1;
  @Input() page : number = 1;
  @Input() count : number = 1;

}
