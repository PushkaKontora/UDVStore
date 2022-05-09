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
    selectedOption: any = 'новый';

    constructor(private _personalTransactionsService: PersonalTransactionsService) {
        _personalTransactionsService.getAllOrders()
            .subscribe((orders: IOrder[]) => {
                this.orders = orders;
            })
    }

    ngOnInit(): void {
    }

    onChange($event: any) {
        console.log($event);
    }
}
