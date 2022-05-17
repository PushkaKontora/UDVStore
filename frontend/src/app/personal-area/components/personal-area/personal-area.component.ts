import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../../interfaces/interfaces";
import {PeopleService} from "../../../login/services/people.service";

@Component({
    selector: 'personal-area',
    templateUrl: './personal-area.component.html',
    styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {
    public user?: IUser;

    constructor(private _peopleService: PeopleService) {
        this._peopleService.findUser.subscribe((res) => {
            this.user = res
        });
    }

    ngOnInit(): void {
    }

}
