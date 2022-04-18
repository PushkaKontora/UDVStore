import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser, products} from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private _urlApiProducts: string = 'http://127.0.0.1:8000/api/products/';
    public storeProducts!: products[];

    constructor(private _http: HttpClient) {
    }

    public getProducts(): Subscription {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let options = {headers: headers};
        return this._http.get<products[]>(this._urlApiProducts, options)
            .subscribe((res: products[]) => {
                this.storeProducts = res;
            }, () => {
                alert('Something went wrong - getProducts');
            });
    }
}
