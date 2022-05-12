import {Component, Input, OnInit} from '@angular/core';
import {RequestData} from "./requestdata";

@Component({
  selector: 'app-request-component',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

    @Input() data: RequestData

    constructor(data: RequestData) {
        this.data = data;
    }

    ngOnInit(): void {

    }

}
