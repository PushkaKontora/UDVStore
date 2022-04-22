import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {delay, filter, Observable, of, startWith, Subject, switchMap} from "rxjs";
import {IUser} from "../../../interfaces";

// const databaseMockData: IUser[] = [
//     {
//         username: 'Roman', // email;
//         password: 'Roman',
//         id: 2,
//         first_name: 'Roman',
//         last_name: 'Roman',
//         patronymic: 'Roman',
//         balance: 500,
//         image: 'Roman', // фото - пока нет.
//         is_staff: false
//     },
//     {
//         username: 'Roman', // email;
//         password: 'Roman',
//         id: 2,
//         first_name: 'Roman',
//         last_name: 'Roman',
//         patronymic: 'Roman',
//         balance: 500,
//         image: 'Roman', // фото - пока нет.
//         is_staff: false
//     },
//     {
//         username: 'Roman', // email;
//         password: 'Roman',
//         id: 2,
//         first_name: 'Roman',
//         last_name: 'Roman',
//         patronymic: 'Roman',
//         balance: 500,
//         image: 'Roman', // фото - пока нет.
//         is_staff: false
//     },
//     {
//         username: 'Roman', // email;
//         password: 'Roman',
//         id: 2,
//         first_name: 'Roman',
//         last_name: 'Roman',
//         patronymic: 'Roman',
//         balance: 500,
//         image: 'Roman', // фото - пока нет.
//         is_staff: false
//     },
//     {
//         username: 'Roman', // email;
//         password: 'Roman',
//         id: 2,
//         first_name: 'Roman',
//         last_name: 'Roman',
//         patronymic: 'Roman',
//         balance: 500,
//         image: 'Roman', // фото - пока нет.
//         is_staff: false
//     },
//     {
//         username: 'Roman', // email;
//         password: 'Roman',
//         id: 2,
//         first_name: 'Roman',
//         last_name: 'Roman',
//         patronymic: 'Roman',
//         balance: 500,
//         image: 'Roman', // фото - пока нет.
//         is_staff: false
//     },
//     {
//         username: 'Roman', // email;
//         password: 'Roman',
//         id: 2,
//         first_name: 'Roman',
//         last_name: 'Roman',
//         patronymic: 'Roman',
//         balance: 500,
//         image: 'Roman', // фото - пока нет.
//         is_staff: false
//     },
//     {
//         username: 'Roman', // email;
//         password: 'Roman',
//         id: 2,
//         first_name: 'Roman',
//         last_name: 'Roman',
//         patronymic: 'Roman',
//         balance: 500,
//         image: 'Roman', // фото - пока нет.
//         is_staff: false
//     },
// ];
class User implements IUser {
    constructor(
        balance: number,
        first_name: string,
        id: number,
        is_staff: boolean,
        last_name: string,
        password: string,
        patronymic: string,
        username: string,
        avatarUrl: string | null = null,
    ) {
        this.balance = balance;
        this.first_name = first_name;
        this.id = id;
        this.is_staff = is_staff;
        this.last_name = last_name;
        this.password = password;
        this.patronymic = patronymic;
        this.username = username;
        this.avatarUrl = avatarUrl
    }

    toString(): string {
        return `${this.first_name} ${this.last_name}`;
    }

    balance: number;
    first_name: string;
    id: number;
    is_staff: boolean;
    last_name: string;
    password: string;
    patronymic: string;
    username: string;
    avatarUrl: string | null;
}

const databaseMockData: readonly User[] = [
    new User(500, 'Sedov', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),
    new User(500, 'Sedov', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),
    new User(500, 'mat', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),
    new User(500, 'Sedov', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),
    new User(500, 'Sedov', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),

    new User(500, 'mat', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),
    new User(500, 'Sedov', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),
    new User(500, 'Sedov', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),

    new User(500, 'mat', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),
    new User(500, 'Sedov', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),
    new User(500, 'Sedov', 5, false, 'dfhjkhk', "sdk", "sd","dsj",'http://marsibarsi.me/images/1x1small.jpg' ),
];

@Component({
    selector: 'personal-activity',
    templateUrl: './admin-accrual.component.html',
    styleUrls: ['./admin-accrual.component.scss']
})
export class AdminAccrualComponent implements OnInit {
    public writePers: FormGroup = new FormGroup({});
    readonly search$ = new Subject<string>();
    readonly testValue = new FormControl();

    constructor() {
    }

    ngOnInit(): void {
        this.createForm();
    }

    public onSubmit() {
        this.writePers.patchValue({employee: this.testValue.value});
        console.log(this.writePers)
    }

    private createForm(): void {
        this.writePers = new FormGroup({
            employee: new FormControl(),
            coins: new FormControl('', [Validators.required]),
            activity: new FormControl('', [Validators.required]),
        });
    }


    readonly items$: Observable<readonly User[] | null> = this.search$.pipe(
        filter(value => value !== null),
        switchMap(search =>
            this.serverRequest(search).pipe(startWith<readonly User[] | null>(null)),
        ),
        startWith(databaseMockData),
    );


    public onSearchChange(searchQuery: any) {
        this.search$.next(searchQuery);
    }

    /**
     * Server request emulation
     */
    private serverRequest(searchQuery: string): Observable<readonly User[]> {
        const result = databaseMockData.filter(user =>
            user.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        );

        return of(result).pipe(delay(Math.random() * 1000 + 500));
    }

}


// [formControl]="testValue"
