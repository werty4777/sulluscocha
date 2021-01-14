import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UrlAPI {


    getURL(): string {
        return 'https://serviceprox.herokuapp.com/';
    }


    getToken(): string {

        return 'Bearer ' + localStorage.getItem('token').toString();
    }

    getAlmacen(): string {

        return localStorage.getItem('id');
    }
}
