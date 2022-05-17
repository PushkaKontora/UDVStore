import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {IUser, products} from "../../../interfaces/interfaces";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {SearchStringService} from "../../services/searchString.service";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private _urlLoginUser: string = environment.api_address + '/profile/current/';
    private _urlLoginTokenUser: string = environment.api_address + '/auth/token/login';
    private _urlApiProducts: string = environment.api_address + '/products/';
    public token!: string;

    //найденный юзер
    public findUser = new BehaviorSubject<any>(null);
    public optionsForHttp?: { headers: HttpHeaders; }
    public isLoaded: boolean = false;


    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _cookieService: CookieService,
    ) {
    }


    public showPassword(btn: HTMLElement, input: Element) {
        btn.onclick = () => {
            // btn.classList.toggle('active');
            if (input.getAttribute('type') === 'password') {
                input.setAttribute('type', 'text');
                btn.setAttribute('src', '/assets/images/openEye.svg');
            } else {
                input.setAttribute('type', 'password');
                btn.setAttribute('src', '/assets/images/closeEye.svg');
            }
        }
    }

    public postToken(username: string, password: string) {
        return this._http.post<any>(this._urlLoginTokenUser, {
            "username": username,
            "password": password
        })
    }

    public getProfilesForAdminPage() {
        this.optionsForHttp = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Token " + localStorage.getItem('token'),
            })
        }
        this.getUserWithoutRedirect();
    }

    public getUserProduct() {
        this.optionsForHttp = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Token " + localStorage.getItem('token'),
            })
        }

        this.getUserWithoutRedirect();
    }

    public getUserWithoutRedirect(): Subscription{
        return this.getUserHttp()
            .subscribe(
                (user: IUser) => {
                    if (user) {
                        this.findUser.next(user);
                    } else {
                        alert('user not found');
                    }

                }, () => {
                    alert('Something went wrong');
                },);
    }

    public getUserHttp() {
        return this._http.get<IUser>(this._urlLoginUser, this.optionsForHttp)
    }
//unused
    public getUser() {
        return this.getUserHttp()
            .subscribe(
                (user: IUser) => {
                    if (user) {
                        this.findUser.next(user);
                        if (!user.is_staff) {
                            this._router.navigate(['/main-page/merch']);
                        } else if (user.is_staff) {
                            this._router.navigate(["/admin"]);
                        }
                    } else {
                        alert('user not found');
                    }

                }, () => {
                    alert('Something went wrong');
                });
    }

    public getProducts() {
        return this._http.get<products[]>(this._urlApiProducts, this.optionsForHttp);
    }
}


