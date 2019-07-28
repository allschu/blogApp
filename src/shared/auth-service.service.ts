import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app.config';
import { UserManager, User } from 'oidc-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  protected idp = AppConfig.settings.webapi.IdpService;
  protected basePath = AppConfig.settings.webapi.baseUrl;

  private _userManager: UserManager;
  private _user: User;

  constructor(private httpClient: HttpClient) {
    // tslint:disable-next-line: prefer-const
    let config = {
      authority: this.idp,
      client_id: 'angular_spa',
      scope: 'openid profile webapi',
      response_type: 'id_token token',
      redirect_uri: this.basePath + 'authCallback',
      post_logout_redirect_uri: this.basePath + 'signout-callback-oidc',
      automaticSilentRenew: true,
      silent_redirect_uri: this.basePath + 'silentRedirect'
    };

    if (this._userManager === undefined) {
      this._userManager = new UserManager(config);
      this._userManager.getUser().then(user => {

        if (user && !user.expired) {
          console.log('set user');
          this._user = user;
        }
      });
    } else {
      console.log('use existing userManager');
    }
  }

  login(): Promise<any> {
    return this._userManager.signinRedirect();
  }


  completeAuthentication(): Promise<void> {
    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
    });
  }

  logout(): Promise<any> {
    return this._userManager.signoutRedirect();
  }

  isLoggedInObservable(): any {
    const observerResult = new Observable(observer => {
      setTimeout(() => {
        observer.next(this._user && this._user.access_token && !this._user.expired);
      }, 1000);
    });

    return observerResult;
  }

  isLoggedIn(): boolean {
    return this._user && this._user.access_token && !this._user.expired;
  }

  getAccessToken(): string {
    return this._user ? this._user.access_token : 'no user object';
  }
}
