import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../src/environments/environment';
import { IAppConfig } from './app-config.model';

@Injectable()
export class AppConfig {
    static settings: IAppConfig;


    constructor(private handler: HttpBackend) { }

    load() {
        const jsonFile = `assets/config/config.${environment.name}.json`;

        return new Promise<void>((resolve, reject) => {

            // tslint:disable-next-line: max-line-length tslint:disable-next-line: comment-format
            //Add the backend handler to the client. This will make sure that it go's straight to the backendHttp and will bypass the interceptor
            const httpClient = new HttpClient(this.handler);

            httpClient.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppConfig.settings = <IAppConfig>response;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
