import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'main-page-wrapper',
  templateUrl: './main-page-wrapper.component.html',
  styleUrls: ['./main-page-wrapper.component.scss']
})
export class MainPageWrapperComponent implements OnInit {

  constructor(private _router: Router) {
      _router.navigate(["/main-page/merch"]);
  }

  ngOnInit(): void {
  }

}
