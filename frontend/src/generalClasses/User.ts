import {UsersSearch} from "../interfaces/interfaces";

export class User implements UsersSearch {
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
