import {Component, OnInit} from '@angular/core';
import {PersonalTransactionsService} from "../../../../../services/personal-transactions.service";
import {ITransaction} from "../../../../../../interfaces/transaction";

@Component({
    selector: 'app-admin-accrual-processing-orders',
    templateUrl: './admin-orders-processing-orders.component.html',
    styleUrls: ['./admin-orders-processing-orders.component.scss']
})
export class AdminOrdersProcessingOrdersComponent implements OnInit {
    public transactions?: ITransaction[];

    constructor(private _personalTransactionsService: PersonalTransactionsService) {
        this.getOrders();
    }

    ngOnInit(): void {
    }

    private getOrders(): void {
        this._personalTransactionsService.getAllOrders()
            .subscribe((orders: ITransaction[]) => {
                this.transactions = orders;
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
