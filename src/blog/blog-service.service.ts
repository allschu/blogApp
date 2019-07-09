import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlogClass } from './models/blog';
import { AppConfig } from 'src/app.config';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  protected basePath = AppConfig.settings.webapi.baseUrl;

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<BlogClass[]> {
    return this.http.get<BlogClass[]>(this.basePath + 'api/Blog');
  }
}
