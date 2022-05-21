import {Component, OnInit} from '@angular/core';
import {PersonalHistoryService} from "./personal-history.service";
import {ITransaction} from "../../../../interfaces/transaction";
import {IHistoryEvent} from "./interfaces/components/IHistoryEvent";
import {HistoryEventFactory} from "./history-event-factory.service";
import {PeopleService} from "../../../login/services/people.service";
import {IUser} from "../../../../interfaces/interfaces";

@Component({
    selector: 'personal-history',
    templateUrl: './personal-history.component.html',
    styleUrls: ['./personal-history.component.scss']
})
export class PersonalHistoryComponent implements OnInit {
    public events: IHistoryEvent[];

    constructor(private _historyService: PersonalHistoryService, private _peopleService: PeopleService) {
    }

    ngOnInit(): void {
        this._peopleService.findUser.subscribe({
                next: (findUser: IUser) => {
                    const user = findUser;
                    this._historyService.getHistory()
                        .subscribe((transactions: ITransaction[]) => {
                            this.events = <IHistoryEvent[]>transactions
                                .map((transaction: ITransaction) => HistoryEventFactory.create(transaction, user))
                                .filter((event: IHistoryEvent | null) => event !== null);
                        });
                },
            }
        )
    }
}
