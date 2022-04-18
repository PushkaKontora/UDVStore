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

    constructor(private _peopleService: PeopleService) {
        this.storeProducts = _peopleService.storeProducts;
        console.log(this.storeProducts)
    }

    ngOnInit(): void {
    }
}
