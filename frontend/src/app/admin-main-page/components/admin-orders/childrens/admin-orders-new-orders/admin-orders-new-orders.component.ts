import {Component, OnInit} from '@angular/core';
import {IOrder} from "../../../../../../interfaces/order";
import {PersonalTransactionsService} from "../../../../../services/personal-transactions.service";

@Component({
    selector: 'app-admin-accrual-new-orders',
    templateUrl: './admin-orders-new-orders.component.html',
    styleUrls: ['./admin-orders-new-orders.component.scss']
})
export class AdminOrdersNewOrdersComponent implements OnInit {
    public orders?: IOrder[];

    constructor(private _personalTransactionsService: PersonalTransactionsService) {
        this.getOrders();
    }

    ngOnInit(): void {
    }

    private getOrders(): void{
        this._personalTransactionsService.getAllOrders()
            .subscribe((orders: IOrder[]) => {
                this.orders = orders;
            });
    }

    public onChangeDone(orderID: number): void {
        this._personalTransactionsService.patchStatusOrders(orderID, 2)
            .subscribe({
                complete: (() => {
                    this.getOrders();
                })
            });
    }

}
