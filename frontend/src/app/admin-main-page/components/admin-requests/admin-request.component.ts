import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../services/request.service";
import {FormControl, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'personal-area',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})

export class AdminRequestComponent implements OnInit
{
    public accrualInputControl = new FormControl(0, [
        Validators.required, Validators.min(0)
    ]);

    public commentInputControl = new FormControl('')

    constructor(private _requestService: RequestService) { }

    ngOnInit()
    {
    }
}
