import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from 'src/app.config';
import { BlogModule } from 'src/blog/blog.module';
import { ReturnComponent } from '../shared/return/return.component';
import { NavMenuComponent } from '../shared/nav-menu/nav-menu.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthInterceptor } from 'src/shared/authinterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@progress/kendo-angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    EditorModule,
    BrowserAnimationsModule
  ],
  providers: [AppConfig, , { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
