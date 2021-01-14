import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ModalComponent} from '../components/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import {RequerimientoService} from '../Services/Requerimiento/requerimiento.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
    selector: 'app-requerimiento',
    templateUrl: './requerimiento.component.html',
    styleUrls: ['./requerimiento.component.css']
})
export class RequerimientoComponent implements OnInit {

    columnas: string[] = ['codigo', 'empleado', 'fechaemision', 'tiporequerimiento', 'estadorequerimiento', 'detalles', 'rechazar']
    columnas2: string[] = ['codigo', 'remitente', 'fechaemision', 'tiporequerimiento', 'estadorequerimiento', 'detalles', 'rechazar']
    cargacompleta = false;
    cargacompleta2 = false;
    datos: MatTableDataSource<any>;

    data2: MatTableDataSource<any>;
    solicitudes: any;

    rol: any;

    @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator> = new QueryList<MatPaginator>();
    @ViewChildren(MatSort) sort: QueryList<MatSort> = new QueryList<MatSort>();

    @ViewChildren(MatPaginator) paginator2: QueryList<MatPaginator> = new QueryList<MatPaginator>();
    @ViewChildren(MatSort) sort2: QueryList<MatSort> = new QueryList<MatSort>();



    @Input()
    public nameComponent: string;

    constructor(public dialog: MatDialog, private req: RequerimientoService) {
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.datos.filter = filterValue.trim().toLowerCase();

        if (this.datos.paginator) {
            this.datos.paginator.firstPage();
        }
    }
    applyFilter2(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data2.filter = filterValue.trim().toLowerCase();

        if (this.data2.paginator) {
            this.data2.paginator.firstPage();
        }
    }


    ngOnInit(): void {
        this.rol = localStorage.getItem('rol');
        this.cargarTodo();

    }

    cargarTodo() {
        this.req.cargarTodosRequerimientos().subscribe(value => {

            console.log("cargando")
            value.misreq.sort((a, b) => {

                const codigo = (a.codigo.split('-')[2]);
                const codigob = (b.codigo.split('-')[2]);

                return Number(codigo) - Number(codigob);


            });
            value.mispet.sort((a, b) => {

                const codigo = (a.codigo.split('-')[2]);
                const codigob = (b.codigo.split('-')[2]);

                return Number(codigo) - Number(codigob);


            });
            this.datos = new MatTableDataSource(value.misreq);
            this.datos.paginator = this.paginator.toArray()[0];
            this.datos.sort = this.sort.toArray()[0];
            this.data2 = new MatTableDataSource<any>(value.mispet);
            this.data2.paginator = this.paginator2.toArray()[1];
            this.data2.sort = this.sort2.toArray()[1];
            //this.datos = value.misreq;
            //this.data2 = value.mispet;


        });


    }

    cargarsolicitudes() {
        this.req.cargarRequerimientos().subscribe(value => {
            this.solicitudes = value;
        })
    }


    editarRequerimiento(componente, codigo, tipo?) {
        this.dialog.open(ModalComponent, {
            data: {
                data: componente,
                codigo: codigo,
                tipo: tipo
            }
        })

        this.dialog.afterAllClosed.subscribe(value => {

            this.cargarTodo();
            console.log('Se cargo todo')

        })

    }

    verRequerimiento(componente, codigo, tipo?) {
        this.dialog.open(ModalComponent, {
            data: {
                data: componente,
                codigo: codigo,
                tipo: tipo
            }
        })

        this.dialog.afterAllClosed.subscribe(value => {

            this.cargarTodo();
            console.log('Se cargo todo')
        })
    }

    agregaRequerimiento() {
        this.dialog.open(ModalComponent, {
            data: {
                data: 'requerimiento'

            }
        })
        this.dialog.afterAllClosed.subscribe(value => {

            this.cargarTodo();
            console.log('Se cargo todo')

        })
    }

    rechazarRequerimiento(codigo: string) {

        this.req.rechazarRequerimiento(codigo).subscribe(value => {
            alert('Requerimiento rechazado con exito');
            this.cargarTodo();
            console.log('Se cargo todo')
        });


    }

    rechazarRequerimientoTraslado(codigo: string) {

        this.req.rechazarRequerimientoTraslado(codigo).subscribe(value => {
            alert('Requerimiento rechazado con exito');
            this.cargarTodo();
            console.log('Se cargo todo')
        });


    }
}
