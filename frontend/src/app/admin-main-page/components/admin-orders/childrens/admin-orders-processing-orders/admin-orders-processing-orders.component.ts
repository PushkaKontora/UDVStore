import {Component, OnInit} from '@angular/core';
import {IOrder} from "../../../../../../interfaces/order";
import {PersonalTransactionsService} from "../../../../../services/personal-transactions.service";

@Component({
    selector: 'app-admin-accrual-processing-orders',
    templateUrl: './admin-orders-processing-orders.component.html',
    styleUrls: ['./admin-orders-processing-orders.component.scss']
})
export class AdminOrdersProcessingOrdersComponent implements OnInit {
    public orders?: IOrder[];

    constructor(private _personalTransactionsService: PersonalTransactionsService) {
        this.getOrders();
    }

    ngOnInit(): void {
    }

    private getOrders(): void {
        this._personalTransactionsService.getAllOrders()
            .subscribe((orders: IOrder[]) => {
                this.orders = orders;
            });
    }

    public onChangeNew(orderID: number): void {
        this._personalTransactionsService.patchStatusOrders(orderID, 1)
            .subscribe({
                complete: (() => {
                    this.getOrders();
                })
            });
    }

}
