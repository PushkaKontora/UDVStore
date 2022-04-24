import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../admin.service";

@Component({
    selector: 'app-personal-area-wrapper',
    templateUrl: './admin-main-page-wrapper.component.html',
    styleUrls: ['./admin-main-page-wrapper.component.scss']
})
export class AdminMainPageWrapperComponent implements OnInit {

    constructor(private _router: Router, private _adminService: AdminService) {
        _adminService.getProfiles();
    }

    ngOnInit(): void {

    }

}
