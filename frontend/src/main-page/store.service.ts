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
    public storeProducts!: products[];
    public token?: string;

    constructor(private _http: HttpClient, private _peopleService: PeopleService) {
        this.token = _peopleService.token;
    }

    ngOnInit() {
    }

    public postSelectedProduct(amount:number, storage_cell: cell){
        this._http.post<any>(this._urlApiCartPost, {
            "amount": amount,
            "storage_cell": storage_cell
        })
            .subscribe(
                (res: any) => {
                  console.log('postSelectedProduct!!!!!!!!! ' + amount + '  ' + storage_cell);
                });
    }
}
