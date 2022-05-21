import {Component, OnInit} from '@angular/core';
import {PersonalHistoryService} from "./personal-history.service";
import {ITransaction} from "../../../../interfaces/transaction";
import {IHistoryEvent} from "./interfaces/components/IHistoryEvent";
import {HistoryEventFactory} from "./history-event-factory.service";

@Component({
    selector: 'personal-history',
    templateUrl: './personal-history.component.html',
    styleUrls: ['./personal-history.component.scss']
})
export class PersonalHistoryComponent implements OnInit {
    public events: IHistoryEvent[];

    constructor(private _historyService: PersonalHistoryService) {
    }

    ngOnInit(): void {
        this._historyService.getHistory()
            .subscribe((transactions: ITransaction[]) => {
                this.events = <IHistoryEvent[]>transactions
                    .map(HistoryEventFactory.create)
                    .filter((event: IHistoryEvent | null) => event !== null);
            });
    }
}
