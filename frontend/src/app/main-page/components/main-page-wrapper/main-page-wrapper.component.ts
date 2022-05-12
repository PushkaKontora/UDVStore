import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser, UsersSearch} from "../../../../interfaces/interfaces";
import {PeopleService} from "../../../login/services/people.service";
import {StoreService} from "../../services/store.service";
import {delay, filter, Observable, of, startWith, Subject, switchMap} from "rxjs";
import {SearchStringService} from "../../../services/searchString.service";
import {User} from "../../../../generalClasses/User";
import {TuiBooleanHandler} from "@taiga-ui/cdk";


@Component({
    selector: 'main-page-wrapper',
    templateUrl: './main-page-wrapper.component.html',
    styleUrls: ['./main-page-wrapper.component.scss']
})
export class MainPageWrapperComponent implements OnInit {
    public writePers: FormGroup = new FormGroup({})
    public user?: IUser;
    public selectedUser: string = 'abj';
    public foundUsers!: UsersSearch[];
    private _chooseUserId?: number;

    public value = null;
    public search$ = new Subject<string>();
    readonly testValue = new FormControl();
    private databaseMockData: UsersSearch[] = [];
    readonly disabledItemHandler: TuiBooleanHandler<User> = ({photo}) => !!photo;



constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _peopleService: PeopleService,
        private _storeService: StoreService,
        private _searchStringService: SearchStringService,
    ) {
        this.user = this._peopleService.findUser;
        this.foundUsers = this._searchStringService.foundUsers;
        this.createForm();
        this.makeUserArray();
    }

    ngOnInit(): void {
        this._router.navigate(["/main-page/merch"]);
        console.log(this._peopleService.findUser?.balance)
    }

    public createGift(): void {
        this._router.navigate(['./merch/present'], {relativeTo: this._route})
    }

    public openModel(nameModel: string) {
        document.getElementById(nameModel)!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
    }

    public closeModel(nameModel: string) {
        document.getElementById(nameModel)!.style.display = 'none';
        document.body.style.overflow = "visible";
        document.body.classList.remove('modalOpen');
        this._peopleService.getUser();
        this.user = this._peopleService.findUser;
    }

    public onSubmit() {
        this.writePers.patchValue({employee: this.testValue.value});
        this._searchStringService.postUserAccrualCoins(this.testValue.value[0].id, this.writePers.value.coins, this.writePers.value.activity)
            .subscribe(
                () => {
                    this.writePers.reset();
                },
                () => {
                },
                () => {
                }
            );
        this.search$.next('');
        this.closeModel('modal-1');
        this.openModel('modal-2');
    }

    public onSearchChange(search: any) {
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

    onChange($event: any) {

    }
}

/**
 * todo: сделать предупреждение о недостатке средств(при отправке подарка) - мб валидатор или посоветоваться с Юрой, мб он знает метод лучше
 * todo: поправить отправку на сервер - созвон с Юрой
 * todo: сделать свой поиск по одному человеку( можно списать с тестового артсофте) с пайпом
 */
