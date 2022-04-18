import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser, products} from "../interfaces";
import {PeopleService} from "../login/people.service";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private _urlApiProducts: string = 'http://127.0.0.1:8000/api/products/';
    public storeProducts!: products[];
    public token?: string;

    constructor(private _http: HttpClient, private _peopleService: PeopleService) {
        this.token = _peopleService.token;
    }

    ngOnInit() {
    }

    // public getProducts(): Subscription {
    //     let headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': "Token " + this.token
    //     });
    //     let options = {headers: headers};
    //     return this._http.get<products[]>(this._urlApiProducts, options)
    //         .subscribe((res: products[]) => {
    //             this.storeProducts = res;
    //             console.log(this.storeProducts[0] + '  getProducts')
    //         }, () => {
    //             alert('Something went wrong - getProducts');
    //         });
    // }
}
