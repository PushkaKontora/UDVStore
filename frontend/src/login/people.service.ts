import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {IUser} from "../interfaces";
import {Subscription} from "rxjs";
import {CrossOrigin} from "@angular-devkit/build-angular";

function GetMapping(s: string) {

}

@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private _urlLoginUser: string = 'http://127.0.0.1:8000/api/profile/current';
    private _urlLoginTokenUser: string = 'http://127.0.0.1:8000/auth/token/login';
    public token?: string;
    public options: any;

    constructor(private _http: HttpClient, private _router: Router) {
        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            'Access-Control-Allow-Credentials': 'true'
        });
        this.options = {headers: headers};
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

    public postToken(username: string, password: string, login: FormGroup) {
        this._http.post<any>(this._urlLoginTokenUser, {
            "username": username,
            "password": password
        }, this.options)
            .subscribe(
                (res: any) => {
                    login.reset();
                    this.token = res?.auth_token;
                    console.log(this.token);
                    console.log('postToken - done!');
                });
    }

    public getUser(loginEmail: string, loginPassword: string, login: FormGroup): Subscription {
        return this._http.get<IUser[]>(this._urlLoginUser)
            .subscribe((res: IUser[]) => {
                const user: IUser | undefined = res.find((a: IUser) => {
                    return a.username === loginEmail && a.password === loginPassword;
                });


                // if (user) {
                //     if (user.isAdmin === false) {
                //         this._router.navigate(['/main-page/' + user.id]);
                //         login.reset();
                //     } else if (user.isAdmin === true) {
                //         this._router.navigate(['/admin/' + user.id]);
                //         login.reset();
                //     }
                // } else {
                //     alert('user not found');
                // }

                if (user) {
                    this._router.navigate(['/main-page/' + user.id]);
                    login.reset();
                } else {
                    alert('user not found');
                }
            }, () => {
                alert('Something went wrong');
            });
    }
}



