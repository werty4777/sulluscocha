import {Component, ElementRef, OnInit} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {RxStompService} from '@stomp/ng2-stompjs';
import {UrlAPI} from '../../Services/urlAPI';
import {NotificacionModel} from '../../model/notificacionModel';
import {ModalComponent} from '../modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import {CardsServiceService} from '../../Services/cards-service.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


    data: NotificacionModel[] = [];


    urlWatch = '/secured/user/queue/specific-user/';
    urlActual = '/secured/user/queue/specific-user/';
    location: Location;
    mobile_menu_visible: any = 0;
    private listTitles: any[];
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(public dialog: MatDialog, location: Location, private element: ElementRef, private router: Router, private stomp: RxStompService, private url: UrlAPI,private card:CardsServiceService) {




        this.location = location;
        this.sidebarVisible = false;
        const audio = new Audio();
        audio.src = '../../../assets/audio/notificacion.mp3';
        audio.load();
        this.card.cargarDashboard().subscribe(value => {
            this.card.getRol().subscribe(value2 => {

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

                this.stomp.watch(this.urlWatch + this.url.getAlmacen(), {
                    Authorization: this.url.getAlmacen()
                }).subscribe(value => {
                    console.log(value);
                    this.data = JSON.parse(value.body);


                })
                this.stomp.watch(this.urlWatch + 'nuevo/' + this.url.getAlmacen(), {
                    Authorization: this.url.getAlmacen()
                }).subscribe(value => {
                    console.log(value);
                    this.data = JSON.parse(value.body);

                    audio.play();

                })

                this.stomp.publish({
                    destination: '/app/chat', headers: {
                        Authorization: this.url.getAlmacen()
                    }
                });



            })
        })


    }

    ngOnInit() {




        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });


    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }


    logout() {
        localStorage.removeItem('data');
        window.location.reload();
    }

    editarRequerimiento(componente, codigo, tipo?) {
        this.dialog.open(ModalComponent, {
            data: {
                data: componente,
                codigo: codigo,
                tipo: tipo
            }
        })


    }


    verRequerimiento(codigo, tipo) {

        if (tipo === 'NECESIDAD') {
            this.editarRequerimiento('detalles', codigo);
        }

        if (tipo === 'NOSTOCK') {
            this.editarRequerimiento('detallesEditar', codigo);

        }


    }
}
