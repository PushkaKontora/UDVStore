import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {IUser} from "../interfaces";


@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    private _urlLoginUser: string = 'http://127.0.0.1:8000/auth/token/login';

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

    public getUser(loginEmail: string, loginPassword: string, login: FormGroup): void {
        this._http.get<IUser[]>(this._urlLoginUser)
            .subscribe((res: IUser[]) => {
                const user: IUser | undefined = res.find((a: IUser) => {
                    return a.email === loginEmail && a.password === loginPassword;
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



