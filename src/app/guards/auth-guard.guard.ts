import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceOAuthService} from '../authService/service-oauth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CardsServiceService} from '../Services/cards-service.service';

declare var gapi: any;

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {


    constructor(private router: Router, private ouath: ServiceOAuthService, private card: CardsServiceService) {

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        //console.log('Entre aca')
        const user = this.ouath.getUser();//undefined
        const loged = localStorage.getItem('gmail');//null
        //console.log(user);
        //console.log(loged);


        try {
            if (user !== undefined && loged === 'true') {



                return true;
            } else {


                // @ts-ignore
                localStorage.removeItem(localStorage.key('token'))
                // @ts-ignore
                localStorage.removeItem(localStorage.key('gmail'))
                // @ts-ignore
                localStorage.removeItem(localStorage.key('almacen'))
                // @ts-ignore
                localStorage.removeItem(localStorage.key('rol'))
                // @ts-ignore
                localStorage.removeItem(localStorage.key('id'))
                // @ts-ignore
                localStorage.removeItem(localStorage.key('cargo'))


                this.router.navigate(['/login']);

            }
        } catch (e) {
            this.router.navigate(['/login']);

        }


    }


}
