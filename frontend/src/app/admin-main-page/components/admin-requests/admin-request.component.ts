import { Component, OnInit } from '@angular/core';
import {AdminMainPageWrapperComponent} from "../admin-main-page -wrapper/admin-main-page-wrapper.component";
import {RequestData} from "./request-component/requestdata";

@Component({
  selector: 'personal-area',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

  getRequestData(): RequestData[] {
    // http request
    return [];
  }

}
