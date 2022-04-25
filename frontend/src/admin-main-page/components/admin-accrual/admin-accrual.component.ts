import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {delay, EMPTY, filter, first, Observable, of, retry, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {IUser, UsersSearch} from "../../../interfaces";
import {AdminService} from "../../admin.service";


class User implements UsersSearch {
    constructor(
        id: number,
        username: string,
        first_name: string,
        last_name: string,
        email: string,
        patronymic: string,
        balance: number,
        photo: string | null = null,
        is_staff: boolean
    ) {
        this.balance = balance;
        this.first_name = first_name;
        this.id = id;
        this.is_staff = is_staff;
        this.last_name = last_name;
        this.email = email;
        this.patronymic = patronymic;
        this.username = username;
        this.photo = photo
    }

    toString(): string {
        return `${this.first_name} ${this.last_name}`;
    }

    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    patronymic: string;
    balance: number;
    photo: string | null;
    is_staff: boolean
}

const databaseMockData: UsersSearch[] = [];

@Component({
    selector: 'personal-activity',
    templateUrl: './admin-accrual.component.html',
    styleUrls: ['./admin-accrual.component.scss'],
})
export class AdminAccrualComponent implements OnInit {
    public writePers: FormGroup = new FormGroup({});
    search$ = new Subject<string>();
    readonly testValue = new FormControl();
    public foundUsers!: UsersSearch[];

    constructor(
        private _adminService: AdminService,
        ) {

    }

    ngOnInit(): void {
        if (this._adminService.foundUsers) {
            this.foundUsers = this._adminService.foundUsers;
        }
        this.makeUserArray();
        this.createForm();
    }
    public openModel() {
        document.getElementById('modal-1')!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
    }

    public closeModel(){
        document.getElementById('modal-1')!.style.display = 'none';
        document.body.style.overflow = "visible";
        document.body.classList.remove('modalOpen');
    }

    public onSubmit() {
        this.writePers.patchValue({employee: this.testValue.value});
        let arrayId = [];
        for (let user of this.writePers.value.employee) {
            arrayId.push(user.id);
        }
        this._adminService.postAdminAccrual(arrayId, this.writePers.value.coins, this.writePers.value.activity)
            .subscribe(
                (res: any) => {
                    this.writePers.reset();
                });
        this.search$.next('');
        this.makeUserArray();
    }

    private createForm(): void {
        this.writePers = new FormGroup({
            employee: new FormControl(),
            coins: new FormControl('', [Validators.required]),
            activity: new FormControl('', [Validators.required]),
        });
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
}

