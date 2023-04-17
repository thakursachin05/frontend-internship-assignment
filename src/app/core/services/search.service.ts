import { Injectable } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private cache: {[url: string]: BookResponse} = {};

  constructor(private apiService: ApiService) {}

  getAllResult(searchInput: string,title : boolean): Observable<BookResponse> {
    const url = `/search.json?title=${searchInput.toLowerCase().split(' ').join('+')}`;
    const authorUrl = `/search.json?author=${searchInput.toLowerCase().split(' ').join('+')}`;
    
    if(title){
      // Check cache for title response
      if (this.cache[url]) {
        console.log('Returning cached response for title', url);
        return of(this.cache[url]);
      }
      
      // If response is not in cache, fetch from API
      console.log('Fetching response from API for title', url);
      return this.apiService.get(url).pipe(
        tap((response: BookResponse) => {
          // Cache response for 60 seconds
          this.cache[url] = response;
          setTimeout(() => {
            delete this.cache[url];
            console.log('Cache expired for', url);
          }, 60000);
        }) as OperatorFunction<unknown, BookResponse>
        );

      }
      
      else{
          // Check cache for author response
          if (this.cache[authorUrl]) {
            console.log('Returning cached response for author', authorUrl);
            return of(this.cache[authorUrl]);
          }
          // If response is not in cache, fetch from API
          console.log('Fetching response from API for author', authorUrl);
          return this.apiService.get(authorUrl).pipe(
            tap((response: BookResponse) => {
              // Cache response for 60 seconds
              this.cache[authorUrl] = response;
              setTimeout(() => {
                delete this.cache[authorUrl];
                console.log('Cache expired for', authorUrl);
              }, 60000);
            }) as OperatorFunction<unknown, BookResponse>
            );
        }
      }
}
