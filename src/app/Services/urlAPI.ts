import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlAPI {


    getURL(): string {
        return 'https://8fd0e8f57977.ngrok.io/';
    }
}
