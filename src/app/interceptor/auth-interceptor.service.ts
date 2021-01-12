import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ServiceOAuthService} from '../authService/service-oauth.service';
import {CardsServiceService} from '../Services/cards-service.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {


    constructor(private router: Router, public modal: MatDialog, private ouath: ServiceOAuthService, private cardService: CardsServiceService) {
    }

    getToken(): string {
        return <string>localStorage.getItem('token');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        const token = this.getToken();
        let request = req;
        if (token || token != undefined || token != null) {

            request = req.clone({

                setHeaders: {
                    Authorization: 'Bearer ' + token,
                    'Content-type': 'application/json'
                }

            });

        }
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log(err)
                let status = err.status;


                if (status == 401) {

                    this.ouath.getUser().reloadAuthResponse().then(value => {

                        localStorage.setItem('gmail', 'true');
                        // @ts-ignore
                        localStorage.setItem('token', JSON.stringify(value.getAuthResponse().access_token).replace('"', '').replace('"', ''));
                        this.cardService.getRol().subscribe(value2 => {

                            // @ts-ignore
                            localStorage.setItem('rol', String(value2.rol));
                            // @ts-ignore
                            localStorage.setItem('id', String(value2.idalmacen));
                            // @ts-ignore
                            localStorage.setItem('cargo', String(value2.cargo));
                            // @ts-ignore
                            localStorage.setItem('almacen', String(value2.almacen));
                            // @ts-ignore
                            localStorage.setItem('sesionId', String(value2.sesionId))

                        })


                    }).catch(reason => {
                        alert('entre al catch');
                        alert(reason);
                        this.router.navigate(['/login']);

                    })

                }


                /*    if (status == 500 || status == 401 || status == 0) {
                    this.modal.open(ModalErrorComponent, {
                        data: {
                            message: 'Error en el servidor'
                        }
                    })


                    this.modal.afterAllClosed.subscribe(value => {
                    //    this.router.navigate(['/login']);
                     //   localStorage.removeItem('token');
                     //   localStorage.removeItem('gmail');
                    })

                }


                if (status == 404) {

                    this.modal.open(ModalErrorComponent, {
                        data: {
                            message: 'Usted no tiene permiso para acceder a este recurso'
                        }

                    });
                    this.modal.afterAllClosed.subscribe(value => {
                        this.router.navigate(['/home']);


                    });


                }*/


                return throwError(err);

            })
        )


    }
}
