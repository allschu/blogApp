import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BlogClass } from './models/blog';
import { AppConfig } from 'src/app.config';
import { AuthServiceService } from 'src/shared/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  protected basePath = AppConfig.settings.webapi.resourceUrl;

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  addBlog(blogToPost: BlogClass): Observable<BlogClass> {
    return this.http.post<BlogClass>(this.basePath + 'api/blog/blog', blogToPost)
          .pipe(
            tap(_ => console.log('Adds blog')),
            catchError(this.handleError<BlogClass>('Add blog', ))
          );
  }

  getBlogs(): Observable<BlogClass[]> {
    // let token = this.authService.getAccessToken();
    // console.log(token);
    // let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<BlogClass[]>(this.basePath + 'api/blog')
      .pipe(
        tap(_ => console.log('fetched blogs')),
        catchError(this.handleError<BlogClass[]>('getblogs', []))
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
