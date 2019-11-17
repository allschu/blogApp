import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BlogClass } from './models/blog';
import { AppConfig } from 'src/app.config';
import { AuthServiceService } from 'src/shared/auth-service.service';
import { PaginatedResult } from './models/pagination';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  protected basePath = AppConfig.settings.webapi.resourceUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) { }

  addBlog(blogToPost: BlogClass): Observable<BlogClass> {
    return this.http
      .post<BlogClass>(this.basePath + 'api/blog/blog', blogToPost)
      .pipe(
        tap(_ => console.log('Adds blog')),
        catchError(this.handleError<BlogClass>('Add blog'))
      );
  }

  getBlogs(page?, itemsPerPage?): Observable<PaginatedResult<BlogClass[]>> {
    const paginatedResult: PaginatedResult<BlogClass[]> = new PaginatedResult<BlogClass[]>();

    let params = new HttpParams();

    if (page !== null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<BlogClass[]>(this.basePath + 'api/blog', { observe: 'response', params })
      .pipe(
        tap(_ => console.log('fetched blogs')),
        map(response => {

          paginatedResult.result = response.body;
          console.log(response.headers.keys());

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
