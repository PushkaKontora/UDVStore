import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {IUser, products} from "../interfaces";
import {Subscription} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private _urlLoginUser: string = 'http://127.0.0.1:8000/api/profile/current/';
    private _urlLoginTokenUser: string = 'http://127.0.0.1:8000/auth/token/login';
    private _urlApiProducts: string = 'http://127.0.0.1:8000/api/products/';
    public token?: string;
    public findUser?: IUser;
    public storeProducts!: products[];
    public optionsForHttp = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Token " + this.token
        })
    }


    constructor(private _http: HttpClient, private _router: Router) {
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

    public getProducts(): Subscription {
        return this._http.get<products[]>(this._urlApiProducts, this.optionsForHttp)
            .subscribe((res: products[]) => {
                this.storeProducts = res;
            }, () => {
                alert('Something went wrong - getProducts');
            });
    }

    public postToken(username: string, password: string, login: FormGroup) {
        this._http.post<any>(this._urlLoginTokenUser, {
            "username": username,
            "password": password
        })
            .subscribe(
                (res: any) => {
                    login.reset();
                    this.token = res?.auth_token;
                    this.getUser();
                    this.getProducts();
                });
    }

    public getUser(): Subscription {
        return this._http.get<IUser>(this._urlLoginUser, this.optionsForHttp)
            .subscribe((user: IUser) => {
                if (user) {
                    if (!user.is_staff) {
                        this._router.navigate(['/main-page/' + user.id]);
                        this.findUser = user;
                        console.log('!user.is_staff')
                        console.log(this.findUser)
                    } else if (user.is_staff) {
                        this._router.navigate(['/admin/']);
                        this.findUser = user;
                        console.log('user.is_staff')
                    }
                } else {
                    alert('user not found');
                }

            }, () => {
                alert('Something went wrong');
            });
    }
}


