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
    public loaded: boolean = false;

    constructor(private _peopleService: PeopleService, private _storeService: StoreService) {
        this.storeProducts = _peopleService.storeProducts;
        this.loaded = _peopleService.isLoaded;
    }

    ngOnInit(): void {
    }

    chooseProduct(event: any, product: products) {
        this._storeService.postSelectedProduct(1, product.cells[0].id)
            .subscribe(() => {
                this._storeService.postBuyProduct();
            });
    }
}
