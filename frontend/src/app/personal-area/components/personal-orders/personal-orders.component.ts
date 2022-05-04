import {Component, OnInit} from '@angular/core';
import {PersonalTransactionsService} from "../../../services/personal-transactions.service";
import {IOrder} from "../../../../interfaces/order";

@Component({
    selector: 'personal-orders',
    templateUrl: './personal-orders.component.html',
    styleUrls: ['./personal-orders.component.scss']
})
export class PersonalOrdersComponent implements OnInit {
    public orders?: IOrder[];

    constructor(
        private _PersonalTransactionsService: PersonalTransactionsService,
    ) {
        this.getOrders();
    }

    ngOnInit(): void {
    }

    private getOrders(): void {
        this._PersonalTransactionsService.getOrders()
            .subscribe(
                (orders: IOrder[]) => {
                    console.log('orders');
                    this.orders = orders;
                }
            )
    }
}
