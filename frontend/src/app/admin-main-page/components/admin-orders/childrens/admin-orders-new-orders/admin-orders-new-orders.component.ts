import {Component, OnInit} from '@angular/core';
import {PersonalTransactionsService} from "../../../../../services/personal-transactions.service";
import {ITransaction} from "../../../../../../interfaces/transaction";

@Component({
    selector: 'app-admin-accrual-new-orders',
    templateUrl: './admin-orders-new-orders.component.html',
    styleUrls: ['./admin-orders-new-orders.component.scss']
})
export class AdminOrdersNewOrdersComponent implements OnInit {
    public transactions?: ITransaction[];

    constructor(private _personalTransactionsService: PersonalTransactionsService) {
        this.getOrders();
    }

    ngOnInit(): void {
    }

    private getOrders(): void{
        this._personalTransactionsService.getAllOrders()
            .subscribe((orders: ITransaction[]) => {
                this.transactions = orders;
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
