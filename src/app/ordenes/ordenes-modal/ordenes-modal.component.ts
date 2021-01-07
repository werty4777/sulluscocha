import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Data, RequerimientoService} from '../../Services/Requerimiento/requerimiento.service';

@Component({
    selector: 'app-ordenes-modal',
    templateUrl: './ordenes-modal.component.html',
    styleUrls: ['./ordenes-modal.component.css']
})
export class OrdenesModalComponent implements OnInit {


    columnas: string[] = ['codigo', 'nombre', 'talla', 'color', 'modelo', 'marca', 'tipo', 'cantidad', 'unidadMedida', 'precioUnitario', 'descuento', 'total'];
    @Input()
    codigo;


    titulos: string[] = ['codigo', 'fecha de la orden', 'Realizado por ', 'Codigo del requerimiento', 'Estado de la orden', 'RUC', 'Nombre del proveedor', 'Direccion del proveedor',
        'telefono del proveedor', 'fecha de entrega', 'direccion de entrega', 'moneda', 'condicion de pago', 'forma de pago']

    data: Data;

    datos: string[] = ['codigo', 'fechaOrden', 'usuarioEmite', 'codigoRequerimiento', 'estadoOrden', 'ruc', 'proveedor', 'direccion', 'telefono', 'fechaEntrega', 'direccionEntrega', 'moneda', 'condicionPago', 'formaPago'];


    constructor(public dialog: MatDialog, private req: RequerimientoService) {


    }


    async ngOnInit() {
        await this.cargarDatos();


    }

    confirmarOrden() {
        this.req.confirmarOrden(this.codigo).subscribe(value => {

        });
        alert('Orden confirmada');
        this.dialog.closeAll();
    }

    async cargarDatos() {
        await this.req.detallesOrdenes(this.codigo).subscribe(value => {

            this.data = value;


        })
    }
}
