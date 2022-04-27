import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {IUser, products} from "../../../interfaces/interfaces";
import {Subscription} from "rxjs";
import {SearchStringService} from "../../services/searchString.service";


@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private _urlLoginUser: string = 'http://127.0.0.1:8000/api/profile/current/';
    private _urlLoginTokenUser: string = 'http://127.0.0.1:8000/auth/token/login';
    private _urlApiProducts: string = 'http://127.0.0.1:8000/api/products/';
    public token!: string;
    public findUser?: IUser;
    public storeProducts!: products[];
    public optionsForHttp?: { headers: HttpHeaders; }
    public isLoaded: boolean = false;


    constructor(
        private _http: HttpClient,
        private _router: Router
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

    public getProfilesForAdminPage(){
        this.optionsForHttp= {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Token " + localStorage.getItem('token'),
            })
        }
        this.getUser();
    }

    public getUserProduct(){
        this.optionsForHttp= {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Token " + localStorage.getItem('token'),
            })
        }

        this.getProducts();
        this.getUser();
    }

    public getUser(){
        return this._http.get<IUser>(this._urlLoginUser, this.optionsForHttp)
            .subscribe(
                (user: IUser) => {
                    if (user) {
                        if (!user.is_staff) {
                            this._router.navigate(['/main-page/' + user.id]);
                            this.findUser = user;
                        } else if (user.is_staff) {
                            this.findUser = user;
                            this._router.navigate(["/admin/"]);
                        }
                    } else {
                        alert('user not found');
                    }

                }, () => {
                    alert('Something went wrong');
                });
    }

    public getProducts(): Subscription {
        return this._http.get<products[]>(this._urlApiProducts, this.optionsForHttp)
            .subscribe((res: products[]) => {
                this.storeProducts = res;
                this.isLoaded = true;
            }, () => {
                alert('Something went wrong - getProducts');
            });
    }

}


