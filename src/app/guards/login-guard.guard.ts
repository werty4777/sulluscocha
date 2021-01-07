import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ServiceOAuthService} from '../authService/service-oauth.service';
import {oauth2} from 'googleapis/build/src/apis/oauth2';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
    constructor(private router: Router, private ouath: ServiceOAuthService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


        const user = this.ouath.getUser();//undefined
        const loged = localStorage.getItem('gmail');//null

        console.log(user);
        console.log(loged);

      try {
          if (user != undefined && loged==='true') {

              localStorage.setItem('gmail', 'true');
              this.router.navigate(['/home']);
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
              console.log(this.ouath.error)

              return true;
          }
      }catch (e){
          this.router.navigate(['/login']);
      }


    }

}
