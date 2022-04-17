import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../interfaces";
import {PeopleService} from "../../../login/people.service";

@Component({
    selector: 'personal-area',
    templateUrl: './personal-area.component.html',
    styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {
    public user?: IUser;

    constructor(private _peopleService: PeopleService) {
        this.user = _peopleService.findUser;
    }

    ngOnInit(): void {
    }

}
