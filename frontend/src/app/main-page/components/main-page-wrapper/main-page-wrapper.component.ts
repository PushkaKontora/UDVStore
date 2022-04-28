import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser, UsersSearch} from "../../../../interfaces/interfaces";
import {PeopleService} from "../../../login/services/people.service";
import {StoreService} from "../../services/store.service";
import {delay, filter, Observable, of, startWith, Subject, switchMap} from "rxjs";
import {SearchStringService} from "../../../services/searchString.service";
import {User} from "../../../../generalClasses/User";


@Component({
    selector: 'main-page-wrapper',
    templateUrl: './main-page-wrapper.component.html',
    styleUrls: ['./main-page-wrapper.component.scss']
})
export class MainPageWrapperComponent implements OnInit {
    public writePers: FormGroup = new FormGroup({})
    public user?: IUser;
    search$ = new Subject<string>();
    readonly testValue = new FormControl();
    public foundUsers!: UsersSearch[];
    private databaseMockData: UsersSearch[] = [];

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _peopleService: PeopleService,
        private _storeService: StoreService,
        private _searchStringService: SearchStringService,
    ) {
        if (this._searchStringService.foundUsers) {
            this.foundUsers = this._searchStringService.foundUsers;
        }
        this.createForm();
        this.user = this._peopleService.findUser;
        this.makeUserArray();
    }

    ngOnInit(): void {
        this._router.navigate(["/main-page/merch"]);
    }

    public createGift(): void {
        this._router.navigate(['./merch/present'], {relativeTo: this._route})
    }

    public openModel() {
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
        this.writePers.patchValue({employee: this.testValue.value});
        this._searchStringService.postUserAccrualCoins(this.testValue.value[0].id, this.writePers.value.coins, this.writePers.value.activity)
            .subscribe(
                (res: any) => {
                    this.writePers.reset();
                    this._peopleService.getUser();
                });
        this.search$.next('');
        this.closeModel();
        console.log('click');
        console.log( this.databaseMockData);
    }

    public onSearchChange(search: string | null) {
        this.search$.next(search || '');
    }

    readonly items$: Observable<readonly UsersSearch[] | null> = this.search$.pipe(
        filter(value => value !== null),
        switchMap(search =>
            this.serverRequest(search).pipe(startWith<readonly UsersSearch[] | null>(null)),
        ),
        startWith(this.databaseMockData),
    );

    private serverRequest(searchQuery: string): Observable<readonly UsersSearch[]> {
        const result = this.databaseMockData.filter(user =>
            user.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        );

        return of(result).pipe(delay(Math.random() * 1000 + 500));
    }


    private createForm(): void {
        this.writePers = new FormGroup({
            employee: new FormControl(''),
            coins: new FormControl('', [Validators.required]),
            comment: new FormControl('', [Validators.required]),
        });
    }

    private makeUserArray(): void {
        for (let user of this.foundUsers) {
            this.databaseMockData.push(new User(user.id, user.username, user.first_name, user.last_name, user.email,
                user.patronymic, user.balance, user.photo, user.is_staff));
        }
    }
}

/**
 * todo: сделать предупреждение о недостатке средств(при отправке подарка) - мб валидатор или посоветоваться с Юрой, мб он знает метод лучше
 * todo: поправить отправку на сервер - созвон с Юрой
 */
