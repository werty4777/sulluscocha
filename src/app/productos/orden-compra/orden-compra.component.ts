import {Component, OnInit} from '@angular/core';
import {OrderServiceService} from '../../Services/product/orderProduct/order-service.service';
import {RequerimientoService} from '../../Services/Requerimiento/requerimiento.service';
import {MatDialog} from '@angular/material/dialog';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../../requerimiento/modal-requerimiento/modal-requerimiento.component';
import {ListaCodigoProductoModelo} from '../../model/listaCodigoProductoModelo';
import {DetallesOrden, OrdenCompra} from '../../model/ordenCompra';


@Component({
    selector: 'app-orden-compra',
    templateUrl: './orden-compra.component.html',
    styleUrls: ['./orden-compra.component.css'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class OrdenCompraComponent implements OnInit {

    displayedColumns: string[] = ['tipo', 'nombre', 'modelo', 'marca', 'color', 'talla', 'precioUnitario', 'unidadMedida', 'cantidad', 'descuento', 'borrar'];
    displayedColumnsfields: string[] = ['tipo', 'nombre', 'modelo', 'marca', 'color', 'talla', 'precioUnitario', 'unidadMedida', 'cantidad', 'descuento'];

    tipoRequerimiento: any;


    tipo: any;


    selectedValue: string;
    monedas: string[] = ['PEN', 'USD'];


    //

    nombre = [];
    nombreselected = [];
    tipoData = [];
    talla = [];
    modelo = [];
    marca = [];
    color = [];
    precioUnitario = [];
    uniadMedida = [];


    //

    //
    nombreseleccionado;
    tiposeleccionado;
    modeloseleccionado;
    marcaseleccionado;
    colorseleccionado;
    tallaseleccionado;
    precioseleccionado;
    unidadseleccionado;
    //

    grupo = new FormGroup({

        numeroComprobante: new FormControl(),
        observaciones: new FormControl(),
        formaPago: new FormControl(),
        condicionPago: new FormControl(),
        direccionEntrega: new FormControl(),
        ruc: new FormControl(),
        nombre: new FormControl(),
        correo: new FormControl(),
        telefono: new FormControl(),
        direccion: new FormControl(),
        monedas: new FormControl(),

    });


    myFormArrayNoStock = new FormArray([]);

    myformArray = new FormArray([])
    data = this.myformArray.controls;
    tipoCargado = false;
    tipoNombreCargado = false;
    tipoNombreModeloCargado = false;


    tipoNombreModeloMarcaCargado = false;
    tipoNombreModeloMarcaColorCargado = false;
    tipoNombreModeloMarcaColorTallaCargado = false;
    tipoNombreModeloMarcaColorTallaPrecioUnitarioCargado = false;

    constructor(public dialog: MatDialog, private http: OrderServiceService, private requerimentoService: RequerimientoService) {


    }

    ngOnInit() {

        this.cargaTipo();
        this.cargarNombre()
        this.cargarModelo();
        this.cargarMarca();
        this.cargarColor();
        this.cargarTalla();
        this.cargarUnidad();

    }

    cargaTipo() {
        this.http.cargarTipo().subscribe((value: any) => {
            console.log(value);
            this.tipoData = value;
        });

    }

    cargarNombre() {
        this.http.cargarNombre().subscribe((value: []) => {
            this.nombre = value;

            console.log(value);
        });
    }

    cargarModelo() {
        this.http.cargarModelo().subscribe((value: []) => {
            this.modelo = value;

        });

    }

    cargarMarca() {
        this.http.cargarMarca().subscribe((value: []) => {
            this.marca = value;

        });

    }


    add(data?: ListaCodigoProductoModelo) {
        const newGroup = new FormGroup({});
        this.displayedColumnsfields.forEach(x => {

            newGroup.addControl(x, new FormControl());


        })
        this.myformArray.push(newGroup)

        this.data = [...this.myformArray.controls];
    }

    delete(index: number) {
        this.myformArray.removeAt(index);
        this.data = [...this.myformArray.controls];

    }


    buscar(event: ListaCodigoProductoModelo) {

        this.add(event)


    }

    /*    numeroComprobante: new FormControl(),
            observaciones: new FormControl(),
            formaPago: new FormControl(),
            condicionPago: new FormControl(),
            direccionEntrega: new FormControl(),
            fechaEntrega: new FormControl(),
            ruc: new FormControl(),
            nombre: new FormControl(),
            correo: new FormControl(),
            telefono: new FormControl(),
            direccion: new FormControl(),
            monedas: new FormControl(),*/
    confirmarOrden(fecha) {


        let array: DetallesOrden[] = [];


        this.data.forEach(value => {

            // @ts-ignore
            let date = value.controls;
            let a: DetallesOrden = {

                cantidad: date.cantidad.value,
                descuento: date.descuento.value,
                precioUnitario: date.precioUnitario.value,
                tipo: date.tipo.value,
                descripcion: date.nombre.value,
                color: date.color.value,
                marca: date.marca.value,
                modelo: date.modelo.value,
                talla: date.talla.value,
                unidadMedida: date.unidadMedida.value

            }
            array.push(a);


        })


        const arriba: OrdenCompra = {
            numeroComprobante: this.grupo.controls.numeroComprobante.value,
            observaciones: this.grupo.controls.observaciones.value,
            formaPago: this.grupo.controls.formaPago.value,
            fechaEntrega: fecha,
            direccionEntrega: this.grupo.controls.direccionEntrega.value,
            monedas: this.grupo.controls.monedas.value,
            condicionPago: this.grupo.controls.condicionPago.value,
            proveedor: {
                telefono: this.grupo.controls.telefono.value,
                ruc: this.grupo.controls.ruc.value,
                correo: this.grupo.controls.correo.value,
                nombre: this.grupo.controls.nombre.value,
                direccion: this.grupo.controls.direccion.value
            },
            detalles: array


        }
        this.http.ordenCompraNuevo(arriba).subscribe(value => {

            alert('orden de compra creada');
            this.dialog.closeAll();
        });


        console.log(arriba);

    }

    cargarColor() {
        this.http.cargarColor().subscribe((value: []) => {
            this.color = value;


        });
    }

    cargarTalla() {
        this.http.cargarTalla().subscribe((value: []) => {
            this.talla = value;

        });
    }


    cargarUnidad() {
        this.http.cargarUnidad().subscribe((value: []) => {

            this.uniadMedida = value;
            console.log(value);
        });
    }
}
