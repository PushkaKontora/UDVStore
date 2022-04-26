import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'personal-activity',
    templateUrl: './personal-activity.component.html',
    styleUrls: ['./personal-activity.component.scss']
})
export class PersonalActivityComponent implements OnInit {
    public inputControl: FormControl = new FormControl('', [Validators.required]);

    constructor() {
    }

    ngOnInit(): void {
    }

}
