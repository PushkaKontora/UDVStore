import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-personal-area-wrapper',
  templateUrl: './personal-area-wrapper.component.html',
  styleUrls: ['./personal-area-wrapper.component.scss']
})
export class PersonalAreaWrapperComponent implements OnInit {

  constructor(private _router: Router) {
      _router.navigate(["/main-page/personal-area/data"]);
  }

  ngOnInit(): void {
  }

}
