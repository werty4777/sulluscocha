import {Component, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {UrlAPI} from '../Services/urlAPI';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    urlWatch = '/secured/user/queue/specific-user/';
    urlActual = '/secured/user/queue/specific-user/';

    constructor(private stomp: RxStompService, private url: UrlAPI) {
    }

    click() {
        this.initiateConnection();
    }

    showNotification(from, align) {
        console.log('hice click')

        this.initiateConnection();
        const type = ['', 'info', 'success', 'warning', 'danger'];

        const color = Math.floor((Math.random() * 4) + 1);


        // @ts-ignore
        $.notify({
            icon: 'notifications',
            message: 'Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.'

        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }

    ngOnInit() {
        console.log('me cargue')
        console.log(this.stomp.stompClient)

        this.stomp.watch(this.urlWatch + this.url.getToken()).subscribe(value => {

            console.log(value.body)

        })

    }

    initiateConnection() {

        this.stomp.publish({
            destination: '/app/chat', headers: {
                Authorization: this.url.getToken()
            }
        });
    }

}
