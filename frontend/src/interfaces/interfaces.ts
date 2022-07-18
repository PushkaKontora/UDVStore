import {ISize} from "./size";

export interface IUser {
    username: string; // email;
    password: string;
    id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    balance: number;
    photo: string | null;
    is_staff: boolean
}

export interface UsersSearch{
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    patronymic: string,
    balance: number,
    photo: string | null,
    is_staff: boolean
}


export interface cell {
    id: number,
    name: string,
    size: number,
    amount: number
}// клека


