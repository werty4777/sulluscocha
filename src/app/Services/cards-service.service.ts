import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlAPI} from './urlAPI';
import {map} from 'rxjs/operators';

export interface DetalleReporte {
    codigo: string;
    descripcion: string;
    modelo: string;
    marca: string;
    color: string;
    talla: string;
    tipo: string;
    unidadMedida: string;
    entradas: number;
    salidas: number;
    stock: number;
    sumaTotales: number;
    precioUnitario: number;
    existenciasEntradas: number;
    existenciasSalidas: number;
    totalExistencias: number;
}

export interface ReporteModel {
    totalExistenciasSalidas: number;
    totaExistencias: number;
    detalles: DetalleReporte[];
}

@Injectable({
    providedIn: 'root'
})
export class CardsServiceService {


    constructor(private http: HttpClient, private URL: UrlAPI) {
    }

    getRol() {
        console.log('entre al rol')
        return this.http.get(this.URL.getURL() + 'user/me', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
    }


    cargarDashboard() {
        return this.http.get(this.URL.getURL() + 'inventario/dashboard');
    }


    requerimientoRechazado() {


        return this.http.get(this.URL.getURL() + 'inventario/dashboard/lastRequest/rechazadas');
    }

    requerimientoAceptado() {
        return this.http.get(this.URL.getURL() + 'inventario/dashboard/lastRequest/aceptados');

    }

    requerimientoEspera() {
        return this.http.get(this.URL.getURL() + 'inventario/dashboard/lastRequest/espera');

    }

    cargarReporte(): Observable<ReporteModel> {

        return this.http.get(this.URL.getURL() + 'inventario/reporte').pipe(map((value: ReporteModel) => {
            return value;
        }));
    }


    descargarReporte(): Observable<any> {


        return this.http.post(this.URL.getURL() + 'inventario/reporte', null);
    }

}
