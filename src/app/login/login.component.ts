import {Component, OnInit} from '@angular/core';
import {ServiceOAuthService} from '../authService/service-oauth.service';
import {CardsServiceService} from '../Services/cards-service.service';
import {Router} from '@angular/router';


const scopeGoogle = {
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent'
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    constructor(private auth: ServiceOAuthService, private cardService: CardsServiceService, private router: Router) {
    }

    async ngOnInit() {

        await this.auth.initAuth();

    }


    async authenticate() {
        await this.auth.authenticate();



    }
}
