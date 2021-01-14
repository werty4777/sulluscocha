import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import * as Chartistplugin from 'chartist-plugin-tooltips';
import {ServiceOAuthService} from '../authService/service-oauth.service';
import {CardsServiceService} from '../Services/cards-service.service';
import {ModalComponent} from '../components/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {


    data: any = [];
    plugin;

    constructor(public dialog: MatDialog, private http: ServiceOAuthService, private cardService: CardsServiceService) {
        this.plugin = Chartistplugin;

        this.DataCards();

    }


    ngAfterViewInit(): void {

    }


    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });


            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
            if (data.type == 'line') {

                data.element.animate({});

            }
        });

        seq = 0;
    };

    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    async ngOnInit() {


        /*     console.log(this.data.listaEntradasSemanales);
        const dataDailySalesChart: any = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],

            series: [
                [this.data.listaEntradasSemanales[0].entradas, this.data.listaEntradasSemanales[1].entradas, this.data.listaEntradasSemanales[2].entradas, this.data.listaEntradasSemanales[3].entradas, this.data.listaEntradasSemanales[4].entradas, this.data.listaEntradasSemanales[5].entradas, this.data.listaEntradasSemanales[6].entradas]
            ]
        };*/


    }


    DataCards() {


        this.cardService.cargarDashboard().subscribe(value => {

            this.data = value;
            console.log(this.data);
            const dataDailySalesChart: any = {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],

                series: [
                    [{
                        meta: 'dato',
                        value: this.data.listaEntradasSemanales[0].entradas
                    }, {meta: 'adrian', value: this.data.listaEntradasSemanales[1].entradas}, {
                        meta: 'ad',
                        value: 10
                    }, {
                        meta: 'adrian',
                        value: this.data.listaEntradasSemanales[3].entradas
                    }, {
                        meta: 'adrian',
                        value: this.data.listaEntradasSemanales[4].entradas
                    }, {
                        meta: 'adrian',
                        value: this.data.listaEntradasSemanales[5].entradas,
                    }, {
                        meta: 'adrian',
                        value: this.data.listaEntradasSemanales[6].entradas
                    }]
                ]
            }


            const optionsDailySalesChart: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),

                pointDotRadius: 3,
                datasetStrokeWidth: 1,
                plugins: [
                    Chartist.plugins.tooltip({
                        anchorToPoint: false
                    })
                ]

            }

            var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

            this.startAnimationForLineChart(dailySalesChart);


            /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

            const dataCompletedTasksChart: any = {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                series: [
                    [this.data.listaSalidasSemanales[0].salidas, this.data.listaSalidasSemanales[1].salidas, this.data.listaSalidasSemanales[2].salidas, this.data.listaSalidasSemanales[3].salidas, this.data.listaSalidasSemanales[4].salidas, this.data.listaSalidasSemanales[5].salidas, this.data.listaSalidasSemanales[6].salidas]
                ]
            };

            const optionsCompletedTasksChart: any = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),


                plugins: [
                    Chartist.plugins.tooltip()
                ]
            }

            var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

            // start animation for the Completed Tasks Chart - Line Chart
            this.startAnimationForLineChart(completedTasksChart);


            /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

            var datawebsiteViewsChart = {
                labels: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
                series: [
                    [5420, 4430, 3200, 7800, 5530, 4530, 3260, 4340, 5680, 6100, 7560, 8950]

                ]
            };
            var optionswebsiteViewsChart = {
                axisX: {
                    showGrid: false,
                    offset: 15
                },
                axisY: {
                    offset: 80,
                    labelInterpolationFnc: function (value) {
                        return value;
                    },
                    scaleMinSpace: 12
                },

                chartPadding: {top: 0, right: 5, bottom: 0, left: 0},
                plugins: [
                    Chartist.plugins.tooltip({
                        anchorToPoint: false
                    })
                ]
            };
            var responsiveOptions: any[] = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        },


                    },

                }]
            ];
            var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

            //start animation for the Emails Subscription Chart
            this.startAnimationForBarChart(websiteViewsChart);


            this.cardService.getRol().subscribe(value2 => {

                // @ts-ignore
                localStorage.setItem('rol', String(value2.rol));
                // @ts-ignore
                localStorage.setItem('id', String(value2.idalmacen));
                // @ts-ignore
                localStorage.setItem('cargo', String(value2.cargo));
                // @ts-ignore
                localStorage.setItem('almacen', String(value2.almacen));
                // @ts-ignore
                localStorage.setItem('sesionId', String(value2.sesionId))

            })

        })


    }

    verRequerimiento(codigo, tipo) {
        this.dialog.open(ModalComponent, {
            data: {
                data: 'detalles',
                codigo: codigo,
                tipo: tipo
            }
        })

        this.dialog.afterAllClosed.subscribe(value => {

            this.DataCards();

        })
    }

    prueba(tooltipModel) {
        const elemento: HTMLDivElement = document.createElement('div') as HTMLDivElement;
        elemento.style.width = '100px';
        elemento.style.height = '100px';
        elemento.style.backgroundImage = ' url(./assets/img/sidebar-4.jpg)';
        elemento.className = 'clasenueva';




        elemento.addEventListener('mouseover', ev => {
            elemento.appendChild(document.createElement('span'));
        });

        elemento.addEventListener('mouseleave', ev => {
            alert('eliminado')
            document.getElementsByClassName('clasenueva')[0].outerHTML = '';
        });

        document.body.appendChild(elemento);

    }
}
