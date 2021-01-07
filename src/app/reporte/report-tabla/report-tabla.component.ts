import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CardsServiceService, DetalleReporte, ReporteModel} from '../../Services/cards-service.service';
import {MatTableDataSource} from '@angular/material/table';
import * as XLSX from 'xlsx';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-report-tabla',
    templateUrl: './report-tabla.component.html',
    styleUrls: ['./report-tabla.component.css']
})
export class ReportTablaComponent implements OnInit {

    @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
    fileName = 'reporte.xlsx';
    data: ReporteModel;
    dataSource: MatTableDataSource<DetalleReporte>;
    private columnas: string[] = ['codigo',
        'descripcion',
        'modelo',
        'marca',
        'color',
        'talla',
        'tipo',
        'unidadMedida',
        'entradas',
        'salidas',
        'stock',
        'sumaTotales',
        'precioUnitario',
        'existenciasEntradas',
        'existenciasSalidas',
        'totalExistencias']

    constructor(private req: CardsServiceService) {
        this.req.cargarReporte().subscribe(value => {

            this.data = value;
            this.dataSource = new MatTableDataSource<DetalleReporte>(value.detalles);
        })
    }

    ngOnInit(): void {
    }


    cargarReporte() {


    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    exportexcel(): void {

        let element = document.getElementById('excel-table');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {
            cellStyles: true,

        });
        ws['A1'].s = {
            font: {
                color: 'RED'
            }
        }

        console.log(ws['!cols']);


        const wb: XLSX.WorkBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, this.fileName);

    }

    async downloadAsPDF() {
        const doc = new jsPDF(
            {
                orientation: 'l',
                unit: 'pt',


            }
        );

        const specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        const pdfTable = this.pdfTable.nativeElement;


        await doc.html(pdfTable.innerHTML, {
            x: 0,
            y: 0,
            html2canvas: {
                width: 5000,
                height: 1000,
                scale: 0.84,
                svgRendering:true,
                letterRendering:true,
                windowWidth: 1920
            },

        });


        await doc.save('tableToPdf.pdf');
    }

    exportpdf() {




        let data = document.getElementById('pdfTable');
        html2canvas(data).then(canvas => {
            const contentDataURL = canvas.toDataURL('image/jpg', 0.00001)
            let pdf = new jsPDF('l', 'pt', 'a4'); //Generates PDF in landscape mode
            // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
            pdf.addImage(contentDataURL, 'JPG', 0, 0, 700, 700);
            pdf.save('Filename.pdf');
        });


    }

}
