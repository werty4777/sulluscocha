import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlAPI {


    getURL(): string {
        return 'https://b1e5a3a964a8.ngrok.io/';
    }
}
