import {Injectable} from '@angular/core';
import {UrlAPI} from '../urlAPI';
import {HttpClient} from '@angular/common/http';
import {NecesidadCompraRequerimiento} from '../../model/necesidadCompraRequerimiento';
import {NoStockCompraRequerimiento} from '../../model/noStockCompraRequerimiento';
import {NoStockTrasladoRequerimiento} from '../../model/noStockTrasladoRequerimiento';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductModel} from '../../model/productModel';
import {ListaCodigoProductoModelo} from '../../model/listaCodigoProductoModelo';
import {ModeloRequerimientoGeneral} from '../../model/ModeloRequerimientoGeneral';

export interface Data {
    codigo: string;
    condicionPago: string;
    correo: string;
    direccionEntrega: string;
    estadoOrden: string;
    fechaEntrega: string;
    fechaOrden: string;
    moneda: string;
    proveedor: string;
    numeroComprobante: string;
    observaciones: string;
    telefono: string;
    ruc: string;
    almacen: string;
    codigoRequerimiento: string;
    usuarioEmite: string;
    direccion: string;
    formaPago: string;
    detalles: Detalle[];
}


export interface Detalle {
    idDetalles: number;
    codigoProducto: string;
    nombre: string;
    talla: string;
    color: string;
    modelo: string;
    marca: string;
    idTipo: string;
    cantidad: number;
    unidadMedida: string;
    precioUnitario: number;
    descuento: number;
    subTotal: number;
}


@Injectable({
    providedIn: 'root'
})
export class RequerimientoService {

    constructor(private url: UrlAPI, private http: HttpClient) {
    }


    agregarRequerimientoNoStockCompra(data: NoStockCompraRequerimiento) {
        return this.http.post(this.url.getURL() + 'inventario/requerimiento/traslado', data);

    }

    agregarRequerimientoNecesidadCompra(data: NecesidadCompraRequerimiento) {

        return this.http.post(this.url.getURL() + 'inventario/requerimiento/necesidad/compra', data);

    }

    agregarRequerimientNoStockTraslado(data: NoStockTrasladoRequerimiento) {
        return this.http.post(this.url.getURL() + 'inventario/requerimiento/traslado', data);
    }

    getTipo() {

        return this.http.get(this.url.getURL() + 'inventario/tipo');

    }

    cargarAlmacen() {
        return this.http.get(this.url.getURL() + 'inventario/almacen');
    }

    cargarArea() {
        return this.http.get(this.url.getURL() + 'inventario/area');
    }


    buscarProducto(nombre, id): Observable<ListaCodigoProductoModelo[]> {


        return this.http.get(this.url.getURL() + 'inventario/producto/' + nombre + '/' + id).pipe(map((value: ListaCodigoProductoModelo[]) => {
            return value;
        }));

    }

    buscarProductoAlmacen(nombre, idAlmacen) {


        return this.http.get(this.url.getURL() + 'inventario/product/' + nombre + '/' + idAlmacen).pipe(map((value: ListaCodigoProductoModelo[]) => {
            return value;
        }));

    }

    buscarRequerimiento(codigo) {

        return this.http.get(this.url.getURL() + 'inventario/requerimiento/' + codigo);
    }

    cargarRequerimientos() {


        return this.http.get(this.url.getURL() + 'inventario/requerimiento/todo');
    }

    confirmarRequerimiento(codigo) {

        return this.http.get(this.url.getURL() + 'inventario/requerimiento/confirmar/' + codigo)
    }


    confirmarRequerimientoReciboTraslado(codigo) {

        return this.http.get(this.url.getURL() + 'inventario/requerimiento/confirmar/traslado/' + codigo);
    }


    cargarTodosRequerimientos(): Observable<any> {


        return this.http.get(this.url.getURL() + 'inventario/requerimiento/todo');
    }

    cargarSalida(): Observable<any> {

        return this.http.get(this.url.getURL() + 'inventario/movimiento/salida/me');

    }

    cargarEntrada(): Observable<any> {
        return this.http.get(this.url.getURL() + 'inventario/movimiento/entrada/me');
    }

    buscarSalida(codigo: string): Observable<any> {


        return this.http.get(this.url.getURL() + 'inventario/movimiento/salida/' + codigo);
    }

    buscarEntrada(codigo, codigo2): Observable<any> {

        return this.http.get(this.url.getURL() + 'inventario/movimiento/entrada/' + codigo);
    }

    confirmarSalida(codigo, data) {
        return this.http.post(this.url.getURL() + 'inventario/movimiento/confirmar/salida/' + codigo, data);
    }

    confirmarEntrada(codigo: number, data) {


        return this.http.post(this.url.getURL() + 'inventario/movimiento/confirmar/entrada/' + codigo, data);

    }

    cargarOrdenes() {

        return this.http.get(this.url.getURL() + 'inventario/producto/orden');

    }

    detallesOrdenes(codigo: any): Observable<Data> {


        return this.http.get(this.url.getURL() + 'inventario/producto/orden/' + codigo).pipe(map((value: Data) => {


            return value;


        }));
    }


    crearOrdenCompraNoStock(data) {


        return this.http.post(this.url.getURL() + 'inventario/order/nostock', data);
    }


    cargarRequerimientoOrdenDeCompraListCombo() {


        return this.http.get(this.url.getURL() + 'inventario/requerimiento/ordencompra');
    }

    confirmarOrden(codigo) {


        return this.http.post(this.url.getURL() + 'inventario/producto/orden/' + codigo, null);


    }

    confirmarEntraCompra(codigo, data) {
        return this.http.post(this.url.getURL() + 'inventario/entrada/confirmar/compra/' + codigo, data);
    }

    cargarEmpleados() {
        return this.http.get(this.url.getURL() + 'user/empleado/');
    }

    cargarProductos(): Observable<ProductModel[]> {
        return this.http.get(this.url.getURL() + 'inventario/producto/todos').pipe(map((value: ProductModel[]) => {

            return value;
        }));
    }


    //nuevo


    agregarRequerimientoGeneral(data: ModeloRequerimientoGeneral) {
        return this.http.post(this.url.getURL() + 'inventario/requerimiento', data);
    }


    rechazarRequerimiento(codigo: string): Observable<any> {

        return this.http.delete(this.url.getURL() + 'inventario/requerimiento/' + codigo);
    }

    rechazarRequerimientoTraslado(codigo: string): Observable<any> {
        return this.http.delete(this.url.getURL() + 'inventario/requerimiento/traslado/' + codigo);
    }
}
