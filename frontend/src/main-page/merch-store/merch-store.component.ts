import {Component, OnInit} from '@angular/core';
import {StoreService} from "../store.service";
import {products} from "../../interfaces";
import {PeopleService} from "../../login/people.service";

@Component({
    selector: 'main-merch-store',
    templateUrl: './merch-store.component.html',
    styleUrls: ['./merch-store.component.scss']
})
export class MerchStoreComponent implements OnInit {
    public storeProducts!: products[];
    public choseItem: any;

    constructor(private _peopleService: PeopleService, private _storeService: StoreService) {
        this.storeProducts = _peopleService.storeProducts;
    }

    ngOnInit(): void {
    }

    chooseProduct(event: any, product: products) {
        this._storeService.postSelectedProduct(product.cells[0].amount, product.cells[0]);
        console.log(product.cells[0] + '  chooseProduct')
    }
}
