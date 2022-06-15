import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IUser} from "../../../../interfaces/interfaces";
import {PeopleService} from "../../../login/services/people.service";

@Component({
    selector: 'app-personal-area-wrapper',
    templateUrl: './personal-area-wrapper.component.html',
    styleUrls: ['./personal-area-wrapper.component.scss']
})
export class PersonalAreaWrapperComponent implements OnInit {
    public user?: IUser;

    constructor(private _peopleService: PeopleService, private _router: Router) {
        this._peopleService.findUser.subscribe((res) => {
            this.user = res;
        });
        _router.navigate(["/main-page/personal-area/orders"]);
    }


    ngOnInit(): void {
        let jj = [{name: ''}, {name: ','}, {name: ''}];
        let hh: any;
        jj.map((value: any) => {
            hh += value;
        });
        console.log(hh);
    }

}
