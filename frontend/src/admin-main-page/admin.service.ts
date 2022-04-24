import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser, UsersSearch} from "../interfaces";
import {PeopleService} from "../login/people.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private _urlProfiles: string = "http://127.0.0.1:8000/api/profile/";
    //todo: НЕ ЗАБЫТЬ ИСПРАВИТЬ accural НА accrual
    private _urlPostAdminAccrual: string = "http://127.0.0.1:8000/api/admin/accural/";
    public foundUsers?: UsersSearch[];

    constructor(private _router: Router,private _peopleService: PeopleService, private _http: HttpClient) {
    }

    public getProfiles(): Subscription {
        return this._http.get<UsersSearch[]>(this._urlProfiles, this._peopleService.optionsForHttp)
            .subscribe((users: UsersSearch[]) => {
             this.foundUsers = users;
                this._router.navigate(["/admin/accrual"]);
            }, () => {
                alert('Something went wrong - getProfiles');
            });
    }

    public postAdminAccrual(to_profile_id: number | number[], price: number, comment: string) {
        return this._http.post<any>(this._urlPostAdminAccrual, {
            "to_profile_ids": to_profile_id,
            "price": price,
            "comment": comment
        }, this._peopleService.optionsForHttp)
    }
}
