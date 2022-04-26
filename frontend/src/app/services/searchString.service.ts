import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser, UsersSearch} from "../../interfaces/interfaces";
import {PeopleService} from "../login/services/people.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class SearchStringService {
    private _urlProfiles: string = "http://127.0.0.1:8000/api/profile/";
    private _urlPostAccrual: string = "http://127.0.0.1:8000/api/admin/accrual/";
    public foundUsers?: UsersSearch[];

    constructor(
        private _router: Router,
        private _peopleService: PeopleService,
        private _http: HttpClient
    ) {
    }

    public getProfiles(): Subscription {
        return this._http.get<UsersSearch[]>(this._urlProfiles, this._peopleService.optionsForHttp)
            .subscribe((users: UsersSearch[]) => {
                this.foundUsers = users;
                if (this._peopleService.findUser) {
                    if (!this._peopleService.findUser.is_staff) {
                        this._router.navigate(['/main-page/' + this._peopleService.findUser.id]);
                    } else if (this._peopleService.findUser.is_staff) {
                        this._router.navigate(["/admin/accrual"]);
                    }
                }
            }, () => {
               console.log('Something went wrong - getProfiles');
            });
    }

    public postAccrualCoins(to_profile_id: number[], price: number, comment: string) {
        return this._http.post<any>(this._urlPostAccrual, {
            "profile_ids": to_profile_id,
            "price": price,
            "comment": comment
        }, this._peopleService.optionsForHttp)
    }
}
