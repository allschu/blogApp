import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@progress/kendo-angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

import { AppConfig } from 'src/app.config';
import { BlogModule } from 'src/blog/blog.module';
import { AdminModule } from 'src/admin/admin.module';

import { ReturnComponent } from '../shared/return/return.component';
import { NavMenuComponent } from '../shared/nav-menu/nav-menu.component';

import { AuthInterceptor } from 'src/shared/authinterceptor';



export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
@NgModule({
  declarations: [
    AppComponent,
    ReturnComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([
      { path: 'authCallback', component: ReturnComponent }
    ]),
    BlogModule,
    AdminModule,
    EditorModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()     // ToastrModule added,
  ],
  providers: [AppConfig, , { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
