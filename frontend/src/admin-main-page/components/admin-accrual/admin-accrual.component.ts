import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'personal-activity',
    templateUrl: './admin-accrual.component.html',
    styleUrls: ['./admin-accrual.component.scss']
})
export class AdminAccrualComponent implements OnInit {
    public inputControl: FormControl = new FormControl('', [Validators.required]);

    constructor() {
    }

    ngOnInit(): void {
    }

}
