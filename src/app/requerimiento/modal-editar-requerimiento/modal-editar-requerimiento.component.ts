import {Component, Input, OnInit} from '@angular/core';
import {RequerimientoService} from '../../Services/Requerimiento/requerimiento.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
    selector: 'app-modal-editar-requerimiento',
    templateUrl: './modal-editar-requerimiento.component.html',
    styleUrls: ['./modal-editar-requerimiento.component.css']
})
export class ModalEditarRequerimientoComponent implements OnInit {
    displayedColumns: string[] = ['codigo', 'descripcion', 'cantidad'];

    almacen: any;
    area: any;

    data: any;
    almacenid: any;
    rol: any;
    puedoconfirmar: Boolean = false;
    @Input()
    private idRequerimiento: string;
    @Input()
    private op: number;
    @Input()
    private tipo: string;

    constructor(public dialog: MatDialog, private requerimentoService: RequerimientoService) {


    }

    ngOnInit(): void {


        this.rol = localStorage.getItem('rol');

        this.almacenid = localStorage.getItem('id');


        this.requerimentoService.buscarRequerimiento(this.idRequerimiento).subscribe(value => {


            this.data = value;
            console.log(value);
            if ((this.data.estadoRequerimiento == 'ESPERA' && this.op == 1)) {
                console.log('entre aca 1')
                this.puedoconfirmar = true;
            }

            if ((this.data.estadoRequerimiento == 'REVISADO_CONFIRMADO' && this.op == 3)) {
                console.log('entre aca 2')
                this.puedoconfirmar = true;
            }
        })




    }

    confirmarRequerimiento() {


        if ((this.data.tipoRequerimiento === 'NECESIDAD' && this.data.estadoRequerimiento === 'ESPERA') || this.data.tipoRequerimiento === 'NOSTOCK' && this.data.estadoRequerimiento === 'ESPERA') {
            this.requerimentoService.confirmarRequerimiento(this.idRequerimiento).subscribe(value => {
                alert('Requerimiento Confirmado');
            });


            this.dialog.closeAll();

        }

        if (this.data.tipoRequerimiento === 'NOSTOCK' && this.data.estadoRequerimiento === 'REVISADO_CONFIRMADO') {
            this.requerimentoService.confirmarRequerimientoReciboTraslado(this.idRequerimiento).subscribe(value => {
                alert('Requerimiento Confirmado');
            });


            this.dialog.closeAll();

        }


    }

    confirmarRequerimientoReciboTraslado() {

        this.requerimentoService.confirmarRequerimientoReciboTraslado(this.idRequerimiento).subscribe(value => {
        });

        alert('Requerimiento Confirmado del traslado');
        this.dialog.closeAll();


    }
}
