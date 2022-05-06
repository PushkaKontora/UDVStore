import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../interfaces/interfaces";
import {PeopleService} from "../login/services/people.service";
import {IOrder} from "../../interfaces/order";

@Injectable({
    providedIn: 'root'
})
export class PersonalTransactionsService {
    private _urlOrdersUser: string = 'http://127.0.0.1:8000/api/orders/';

    constructor(
        private _http: HttpClient,
        private _peopleService: PeopleService,
    ) {
    }

    public getOrders() {
        const urlOrdersUser: string = this._urlOrdersUser + this._peopleService.findUser?.id + '/';
        return this._http.get<IOrder[]>(urlOrdersUser, this._peopleService.optionsForHttp);
    }
}
