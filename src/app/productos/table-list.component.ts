import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {RequerimientoService} from '../Services/Requerimiento/requerimiento.service';
import {ProductModel} from '../model/productModel';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements AfterViewInit {


    columnas: string[] = ['codigo', 'descripcion', 'marca', 'modelo', 'color', 'talla', 'tipo', 'precio']

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    dataSource: MatTableDataSource<ProductModel>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private req: RequerimientoService) {


        this.req.cargarProductos().subscribe(value => {
            this.dataSource = new MatTableDataSource(value);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })


    }

    ngAfterViewInit() {

    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}



