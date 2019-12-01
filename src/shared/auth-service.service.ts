import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app.config';
import { UserManager, User } from 'oidc-client';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  protected idp = AppConfig.settings.webapi.IdpService;
  protected basePath = AppConfig.settings.webapi.baseUrl;

  private _userManager: UserManager;
  private _user: User;

  constructor() {

    const config = {
      authority: this.idp,
      client_id: 'angular_spa',
      scope: 'openid profile webapi',
      response_type: 'id_token token',
      redirect_uri: this.basePath + 'authCallback',
      post_logout_redirect_uri: this.basePath,
      loadUserInfo: true,
    };

    this._userManager = new UserManager(config);
    this._userManager.getUser().then(user => {
      this._user = user;
      console.log('user set');
    });

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

  setUser() {
    const config = {
      authority: this.idp,
      client_id: 'angular_spa',
      scope: 'openid profile webapi',
      response_type: 'id_token token',
      redirect_uri: this.basePath + 'authCallback',
      post_logout_redirect_uri: this.basePath,
      filterProtocolClaims: true,
      loadUserInfo: true
    };

    this._userManager = new UserManager(config);
    return this._userManager.getUser().then(user => {
      this._user = user;
    });
  }

  // isLoggedInObs(): Observable<boolean> {
  //   return from(this._userManager.getUser()).pipe(map<User, boolean>((user) => {
  //     if (user) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }));
  // }
  

  isLoggedIn(): boolean {
    console.log(this._user != null);
    return this._user != null && !this._user.expired;
  }

  getAccessToken(): string {
    return this._user ? this._user.access_token : 'no user object';
  }
}
