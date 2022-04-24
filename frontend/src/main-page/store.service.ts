import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {cell, IUser, products} from "../interfaces";
import {PeopleService} from "../login/people.service";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private _urlApiCartPost: string = 'http://127.0.0.1:8000/api/cart/';
    private _urlApiBuyPost: string = 'http://127.0.0.1:8000/api/cart/pay/';
    public storeProducts!: products[];
    public token?: string;

    constructor(private _http: HttpClient, private _peopleService: PeopleService) {
        this.token = _peopleService.token;
    }

    ngOnInit() {
    }

    public postSelectedProduct(amount: number, storage_cell: number) {
        return this._http.post<any>(this._urlApiCartPost, {
            "amount": amount,
            "storage_cell": storage_cell
        }, this._peopleService.optionsForHttp)
    }

    public postBuyProduct() {
        this._http.post<any>(this._urlApiBuyPost, {}, this._peopleService.optionsForHttp)
            .subscribe(
                (res: any) => {
                });
    }
}
