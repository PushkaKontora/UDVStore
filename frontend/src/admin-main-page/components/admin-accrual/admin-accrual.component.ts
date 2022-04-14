import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'personal-activity',
    templateUrl: './admin-accrual.component.html',
    styleUrls: ['./admin-accrual.component.scss']
})
export class AdminAccrualComponent implements OnInit {
    public writePers: FormGroup = new FormGroup({})
    constructor() {
    }

    ngOnInit(): void {
        this.createForm();
    }

    public onSubmit(){

    }

    private createForm(): void {
        this.writePers = new FormGroup({
            employee: new FormControl('', [Validators.required]),
            coins: new FormControl('', [Validators.required]),
            activity: new FormControl('', [Validators.required]),
        });
    }
}
