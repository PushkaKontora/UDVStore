import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'personal-history',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

    constructor(private _router: Router) {
    }

    ngOnInit(): void {
        this._router.navigate(['/admin/orders/all-orders']);
    }
}
