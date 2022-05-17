import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SearchStringService} from "../../../services/searchString.service";
import {UsersSearch} from "../../../../interfaces/interfaces";
import {PeopleService} from "../../../login/services/people.service";

@Component({
    selector: 'app-personal-area-wrapper',
    templateUrl: './admin-main-page-wrapper.component.html',
    styleUrls: ['./admin-main-page-wrapper.component.scss']
})
export class AdminMainPageWrapperComponent implements OnInit {

    constructor(
        private _router: Router,
        private _searchStringService: SearchStringService,
        private _peopleService: PeopleService,
    ) {
       this._peopleService.getUserProduct();
        // _searchStringService.getProfiles()
        //     .subscribe((users: UsersSearch[]) => {
        //         this._searchStringService.foundUsers = users;
        //     });
    }

    ngOnInit(): void {
    }

}
