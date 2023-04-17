import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from 'src/app/core/models/book-response.model';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  isLoading: boolean = true;
  searchInput: string = '';
  titleSearch : boolean = true;
  allBooks: Book[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  getResults() {
    this.searchService.getAllResult(this.searchInput,this.titleSearch).subscribe((data) => {
      this.allBooks = data?.docs;
      this.isLoading = false;
      console.log(data);
    });
  }
  ngOnInit(): void {
    this.bookSearch.valueChanges
    .pipe(
      debounceTime(300),
      ).
      subscribe((value: string) => {
        this.searchInput = value || '';
        this.isLoading = true;
        this.page = 1;
        if(this.searchInput.length>0){
          this.getResults();
        }
      });
  }
  onTableDataChange(event: any) {
    this.page = event;
    if(this.searchInput.length>0){
      this.getResults();
    }
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    if(this.searchInput.length>0){
      this.getResults();
    }
  }
  
  clearResults(){
    this.allBooks = [];
    this.bookSearch.setValue('');
  }

  changeSearchType(){
    this.titleSearch = !this.titleSearch;
    if(this.titleSearch)
      document.getElementById('changeSearch')?.classList.add('active');
    else 
      document.getElementById('changeSearch')?.classList.remove('active');
    if(this.searchInput.length>0){
      this.getResults();
    }
  }
}
