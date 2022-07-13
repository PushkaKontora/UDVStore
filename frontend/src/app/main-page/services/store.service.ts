import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PeopleService} from "../../login/services/people.service";
import {environment} from "../../../environments/environment";
import {IProduct} from "../../../interfaces/products";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private _urlApiCartPost: string = environment.api_address + '/cart/';
    private _urlApiBuyPost: string = environment.api_address + '/cart/pay/';
    public storeProducts!:IProduct[];
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
            .subscribe({
                complete: () => this._peopleService.getUserProduct()
            });
    }
}
