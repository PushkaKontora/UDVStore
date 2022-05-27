import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {cell, IUser, products} from "../../../interfaces/interfaces";
import {PeopleService} from "../../login/services/people.service";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private _urlApiCartPost: string = environment.api_address + '/cart/';
    private _urlApiBuyPost: string = environment.api_address + '/cart/pay/';
    public storeProducts!: products[];
    public token?: string;

    constructor(private _http: HttpClient, private _peopleService: PeopleService) {
        this.token = _peopleService.token;
    }

    ngOnInit() {
    }

    public postSelectedProduct(amount: number, storage_cell: number) {
        console.log(amount, storage_cell);

        return this._http.post<any>(this._urlApiCartPost, {
            "amount": amount,
            "storage_cell": storage_cell
        }, this._peopleService.optionsForHttp)
    }

    public postBuyProduct() {
        this._http.post<any>(this._urlApiBuyPost, {}, this._peopleService.optionsForHttp)
            .subscribe({
                complete: () => this._peopleService.getUserProduct()
            });
    }
}
