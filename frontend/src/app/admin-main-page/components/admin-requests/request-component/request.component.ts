import {Component, Input, OnInit} from '@angular/core';
import {IRequestData} from "./IRequestData";

@Component({
  selector: 'app-request-component',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

    @Input() data: IRequestData

    constructor() {

    }

    ngOnInit(): void {

    }

}
