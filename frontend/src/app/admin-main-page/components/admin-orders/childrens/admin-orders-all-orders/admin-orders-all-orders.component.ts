import {Component, OnInit} from '@angular/core';
import {PersonalTransactionsService} from "../../../../../services/personal-transactions.service";
import {IOrder} from "../../../../../../interfaces/order";

@Component({
    selector: 'app-admin-accrual-all-orders',
    templateUrl: './admin-orders-all-orders.component.html',
    styleUrls: ['./admin-orders-all-orders.component.scss']
})
export class AdminOrdersAllOrdersComponent implements OnInit {
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

   public onChangeNew(orderID: number): void {
       this._personalTransactionsService.patchStatusOrders(orderID, 1)
           .subscribe({
               complete: (() => {
                   this.getOrders();
               })
           });
    }
}
