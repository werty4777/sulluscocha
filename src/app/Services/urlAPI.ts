import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlAPI {


    getURL(): string {
        return 'https://e08e31a064f4.ngrok.io/';
    }


    getToken(): string {

        return 'Bearer ' + localStorage.getItem('token').toString();
    }

    getAlmacen(): string {

        return localStorage.getItem('id');
    }
}
