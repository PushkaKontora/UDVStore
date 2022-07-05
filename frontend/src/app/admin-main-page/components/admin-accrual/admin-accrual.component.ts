import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {delay, EMPTY, filter, first, Observable, of, retry, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {IUser, UsersSearch} from "../../../../interfaces/interfaces";
import {SearchStringService} from "../../../services/searchString.service";
import {User} from "../../../../generalClasses/User";
import {Router} from "@angular/router";
import {PersonalHistoryService} from "../../../personal-area/components/personal-history/personal-history.service";
import {PeopleService} from "../../../login/services/people.service";
import {ITransaction} from "../../../../interfaces/transaction";
import {IHistoryEvent} from "../../../personal-area/components/personal-history/interfaces/components/IHistoryEvent";
import {HistoryEventFactory} from "../../../personal-area/components/personal-history/history-event-factory.service";


const databaseMockData: UsersSearch[] = [];

@Component({
    selector: 'personal-activity',
    templateUrl: './admin-accrual.component.html',
    styleUrls: ['./admin-accrual.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAccrualComponent implements OnInit {
    public search$ = new Subject<string>();
    public foundUsers!: UsersSearch[];
    public events: IHistoryEvent[];
    public pers: IUser;
    public click: boolean = false;


    readonly stringify = (name: string): string => name;

    readonly writePers = new FormGroup({
        employee: new FormControl(),
        coins: new FormControl('', [Validators.required, Validators.min(1)]),
        activity: new FormControl('',),
        checkField: new FormControl()
    });

    readonly items = [
        'John Cleese',
        'Eric Idle',
        'Graham Chapman',
        'Michael Palin',
        'Terry Gilliam',
        'Terry Jones',
    ];

    constructor(
        private _searchStringService: SearchStringService,
        private _router: Router,
        private _historyService: PersonalHistoryService,
        private _peopleService: PeopleService,
    ) {
        if (this._searchStringService.foundUsers) {
            this.foundUsers = this._searchStringService.foundUsers;
        }
        this._searchStringService.getProfiles()
            .subscribe((users: UsersSearch[]) => {
                this._searchStringService.foundUsers = users;
                this.foundUsers = users;
            }, () => {
                console.log('Something went wrong - getProfiles');
            }, () => {
                this.makeUserArray();
            });
    }

    ngOnInit(): void {
    }

    public handleClick(event: Event): void {
        event.stopPropagation();
    }

    public openModel() {
        console.log("modal-1 was opened");
        document.getElementById('modal-1')!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
    }

    public closeModel() {
        document.getElementById('modal-1')!.style.display = 'none';
        document.body.style.overflow = "visible";
        document.body.classList.remove('modalOpen');
    }

    public onSubmit() {
        let arrayId = [];
        for (let user of this.writePers.value.employee) {
            arrayId.push(user.id);
        }
        console.log(this.writePers.value.activity)
        console.log(this.writePers.value.coins)
        this._searchStringService.postAdminAccrualCoins(arrayId, this.writePers.value.coins, this.writePers.value.activity)
            .subscribe(
                (res: any) => {
                    this.writePers.reset();
                });
        this.search$.next('');

    }
    public fff(event: any)
    {
        console.log(this.writePers.value.activity)
        console.log(event.target.value)
    }
    private makeUserArray(): void {
        for (let user of this.foundUsers) {
            databaseMockData.push(new User(user.id, user.username, user.first_name, user.last_name, user.email,
                user.patronymic, user.balance, user.photo, user.is_staff));
        }
    }

    readonly items$: Observable<readonly UsersSearch[] | null> = this.search$.pipe(
        filter(value => value !== null),
        switchMap(search =>
            this.serverRequest(search).pipe(startWith<readonly UsersSearch[] | null>(null)),
        ),
        startWith(databaseMockData),
    );

    public onSearchChange(search: string | null) {
        this.search$.next(search || '');
    }

    /**
     * Server request emulation
     */
    private serverRequest(searchQuery: string): Observable<readonly UsersSearch[]> {
        const result = databaseMockData.filter(user =>
            user.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        );

        return of(result).pipe(delay(Math.random() * 1000 + 500));
    }

    public openHistory(user: IUser) {
        this.pers = user;
        this.click = !this.click;
        this.events = [];
        this._historyService.getHistoryAdmin(user.id)
            .subscribe((transactions: ITransaction[]) => {
                this.events = <IHistoryEvent[]>transactions
                    .map((transaction: ITransaction) => HistoryEventFactory.create(transaction, user))
                    .filter((event: IHistoryEvent | null) => event !== null);
            });
    }
}

// при нажатии на элемент выпадающего списка - срабатывает activity формы. ха отсутствием этого, выводить значение по функции fff

