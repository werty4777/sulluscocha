import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlAPI {


    getURL(): string {
        return 'https://8f59fe50f73b.ngrok.io/';
    }


    getToken(): string {

        return 'Bearer ' + localStorage.getItem('token').toString();
    }

    getAlmacen(): string {

        return localStorage.getItem('id');
    }
}
