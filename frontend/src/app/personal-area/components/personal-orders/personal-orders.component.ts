import {Component, OnInit} from '@angular/core';
import {PersonalTransactionsService} from "../../../services/personal-transactions.service";
import {IOrder} from "../../../../interfaces/order";
import {Observable} from "rxjs";

@Component({
    selector: 'personal-orders',
    templateUrl: './personal-orders.component.html',
    styleUrls: ['./personal-orders.component.scss']
})
export class PersonalOrdersComponent implements OnInit {
    public orders?: Observable<IOrder[]>;

    constructor(
        private _PersonalTransactionsService: PersonalTransactionsService,
    ) {
        this.getOrders();
    }

    ngOnInit(): void {
    }

    private getOrders(): void {
        this.orders = this._PersonalTransactionsService.getOrdersUser();
    }
}
