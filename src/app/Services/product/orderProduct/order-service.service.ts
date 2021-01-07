import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlAPI} from '../../urlAPI';
import {OrdenCompra} from '../../../model/ordenCompra';
import {OrdenCompraNoStock} from '../../../model/ordenCompraNoStock';

@Injectable({
    providedIn: 'root'
})
export class OrderServiceService {
    constructor(private http: HttpClient, private url: UrlAPI) {
    }

    cargarPrecio() {
        return this.http.get(this.url.getURL() + 'inventario/producto/precio');
    }

    cargarUnidad() {

        return this.http.get(this.url.getURL() + 'inventario/producto/unidad');

    }

    cargarColor() {
        return this.http.get(this.url.getURL() + 'inventario/producto/color');
    }

    cargarModelo() {
        return this.http.get(this.url.getURL() + 'inventario/producto/modelo');
    }

    cargarNombre() {
        return this.http.get(this.url.getURL() + 'inventario/producto/nombres');
    }

    ordenCompraNuevo(orden: OrdenCompra): Observable<any> {

        return this.http.post(this.url.getURL() + 'inventario/producto/orden', orden);

    }

    ordenNoStockNuevo(orden: OrdenCompraNoStock) {
        return this.http.post(this.url.getURL() + 'inventario/order/nostock', orden);
    }

    cargarTipo() {
        return this.http.get(this.url.getURL() + 'inventario/producto/tipo');
    }

    cargarMarca() {
        return this.http.get(this.url.getURL() + 'inventario/producto/marca/');
    }

    cargarTalla() {
        return this.http.get(this.url.getURL() + 'inventario/producto/talla');
    }
}
