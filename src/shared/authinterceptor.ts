import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { AppConfig } from 'src/app.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    protected basePath = AppConfig.settings.webapi.resourceUrl;

    constructor(private authService: AuthServiceService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.startsWith(this.basePath)) {
            var accessToken = this.authService.getAccessToken();

            const headers = req.headers.set('Authorization', `Bearer ${accessToken}`);

            const authReq = req.clone({ headers });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }

    }
}
