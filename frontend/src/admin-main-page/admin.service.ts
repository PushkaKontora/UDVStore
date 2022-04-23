import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser} from "../interfaces";
import {PeopleService} from "../login/people.service";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private _urlProfiles: string = "http://127.0.0.1:8000/api/profile/?search=";

    constructor(private _peopleService: PeopleService, private _http: HttpClient) {
    }

    public getProfiles(): Subscription {
        return this._http.get<IUser[]>(this._urlProfiles, this._peopleService.optionsForHttp)
            .subscribe((user: IUser[]) => {
                for(let i of user){
                    console.log(i?.id + ' getProfiles')
                }
            }, () => {
                alert('Something went wrong');
            });
    }
}
