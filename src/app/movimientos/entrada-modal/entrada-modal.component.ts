import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RequerimientoService} from '../../Services/Requerimiento/requerimiento.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-entrada-modal',
    templateUrl: './entrada-modal.component.html',
    styleUrls: ['./entrada-modal.component.css']
})
export class EntradaModalComponent implements OnInit {


    columnasCompra: string[] = ['item', 'nombre', 'talla', 'marca', 'color', 'modelo', 'unidadMedida', 'cantidad', 'total'];
    columnasTraslado: string[] = ['item', 'nombre', 'talla', 'marca', 'color', 'modelo', 'unidadMedida', 'cantidad', 'total'];


    @Input()
    tipoEntrada: number;


    listaEmpleado;

    @Input()
    codigo: number;

    data: any = [];
    usuarioseleccionado: any;
    empleados: any;


    grupo = new FormGroup({
        observaciones: new FormControl(''),
        tipoComprobante: new FormControl(''),
        valeIngreso: new FormControl(''),
        empleado: new FormControl(''),
    });


    constructor(public dialog: MatDialog, private req: RequerimientoService) {
    }

    ngOnInit(): void {
        this.cargarData();
        this.req.cargarEmpleados().subscribe(value => {
            console.log(value);
            this.empleados = value;
            console.log(this.empleados)
        })

    }

    cargarData() {

        this.req.buscarEntrada(this.codigo, this.tipoEntrada).subscribe(value => {

            this.data = value;
            console.log(this.data);

        })
    }

    confirmarEntradaTraslado() {

        const data = {
            observaciones: this.grupo.controls.observaciones.value,
            tipoComprobante: this.grupo.controls.tipoComprobante.value,
            valeIngreso: this.grupo.controls.valeIngreso.value,
            idUsuarioRecibe: this.grupo.controls.empleado.value

        }

        this.req.confirmarEntrada(this.codigo, data).subscribe(value => {
            alert("Entrada confirmada");
        });
        this.dialog.closeAll();
    }

    confirmarEntrada() {

        const empleado = {
            idEmpleado: this.usuarioseleccionado
        };


        console.log(empleado);
        this.req.confirmarEntraCompra(this.codigo, empleado).subscribe(value => {
            alert("Entrada confirmada");
        });
        this.dialog.closeAll();
    }

    seleccionarUsuario(iduser) {
        console.log(iduser)
        alert(iduser)
        this.usuarioseleccionado = iduser;
    }
}
