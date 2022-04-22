import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {delay, filter, Observable, of, startWith, Subject, switchMap} from "rxjs";
import {IUser} from "../../../interfaces";

const databaseMockData: IUser[] = [
    {
        username: 'Roman', // email;
        password: 'Roman',
        id: 2,
        first_name: 'Roman',
        last_name: 'Roman',
        patronymic: 'Roman',
        balance: 500,
        image: 'Roman', // фото - пока нет.
        is_staff: false
    },
    {
        username: 'Roman', // email;
        password: 'Roman',
        id: 2,
        first_name: 'Roman',
        last_name: 'Roman',
        patronymic: 'Roman',
        balance: 500,
        image: 'Roman', // фото - пока нет.
        is_staff: false
    },
    {
        username: 'Roman', // email;
        password: 'Roman',
        id: 2,
        first_name: 'Roman',
        last_name: 'Roman',
        patronymic: 'Roman',
        balance: 500,
        image: 'Roman', // фото - пока нет.
        is_staff: false
    },
    {
        username: 'Roman', // email;
        password: 'Roman',
        id: 2,
        first_name: 'Roman',
        last_name: 'Roman',
        patronymic: 'Roman',
        balance: 500,
        image: 'Roman', // фото - пока нет.
        is_staff: false
    },
    {
        username: 'Roman', // email;
        password: 'Roman',
        id: 2,
        first_name: 'Roman',
        last_name: 'Roman',
        patronymic: 'Roman',
        balance: 500,
        image: 'Roman', // фото - пока нет.
        is_staff: false
    },
    {
        username: 'Roman', // email;
        password: 'Roman',
        id: 2,
        first_name: 'Roman',
        last_name: 'Roman',
        patronymic: 'Roman',
        balance: 500,
        image: 'Roman', // фото - пока нет.
        is_staff: false
    },
    {
        username: 'Roman', // email;
        password: 'Roman',
        id: 2,
        first_name: 'Roman',
        last_name: 'Roman',
        patronymic: 'Roman',
        balance: 500,
        image: 'Roman', // фото - пока нет.
        is_staff: false
    },
    {
        username: 'Roman', // email;
        password: 'Roman',
        id: 2,
        first_name: 'Roman',
        last_name: 'Roman',
        patronymic: 'Roman',
        balance: 500,
        image: 'Roman', // фото - пока нет.
        is_staff: false
    },
];

@Component({
    selector: 'personal-activity',
    templateUrl: './admin-accrual.component.html',
    styleUrls: ['./admin-accrual.component.scss']
})
export class AdminAccrualComponent implements OnInit {
    public writePers: FormGroup = new FormGroup({})

    constructor() {
    }

    ngOnInit(): void {
        this.createForm();
    }

    public onSubmit() {
console.log(this.writePers)
    }

    private createForm(): void {
        this.writePers = new FormGroup({
            employee: new FormControl('', [Validators.required]),
            coins: new FormControl('', [Validators.required]),
            activity: new FormControl('', [Validators.required]),
        });
    }

    readonly search$ = new Subject<string>();

    readonly items$: Observable<readonly IUser[] | null> = this.search$.pipe(
        filter(value => value !== null),
        switchMap(search =>
            this.serverRequest(search).pipe(startWith<readonly IUser[] | null>(null)),
        ),
        startWith(databaseMockData),
    );

    readonly testValue = new FormControl([databaseMockData[0]]);

    onSearchChange(searchQuery: any) {
        this.search$.next(searchQuery);
    }

    /**
     * Server request emulation
     */
    private serverRequest(searchQuery: string): Observable<readonly IUser[]> {
        const result = databaseMockData.filter(user =>
            user.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        );

        return of(result).pipe(delay(Math.random() * 1000 + 500));
    }

}
