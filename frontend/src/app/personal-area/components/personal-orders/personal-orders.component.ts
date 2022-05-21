import {Component, OnInit} from '@angular/core';
import {PersonalTransactionsService} from "../../../services/personal-transactions.service";
import {ITransaction} from "../../../../interfaces/transaction";

@Component({
    selector: 'personal-orders',
    templateUrl: './personal-orders.component.html',
    styleUrls: ['./personal-orders.component.scss']
})
export class PersonalOrdersComponent implements OnInit {
    public transactions?: ITransaction[];

    constructor(
        private _PersonalTransactionsService: PersonalTransactionsService,
    ) {
        this.getOrders();
    }

    ngOnInit(): void {
    }

    private getOrders(): void {
        this._PersonalTransactionsService.getOrdersUser()
            .subscribe(
                (orders: ITransaction[]) => {
                    this.transactions = orders;
                }
            )
    }
}
