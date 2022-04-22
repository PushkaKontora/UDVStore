export interface IUser {
    username: string; // email;
    password: string;
    id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    balance: number;
    image?: string; // фото - пока нет.
    is_staff: boolean
}

export interface products {
    id: number,
    name: string,
    description: string,
    price: number,
    photo: string,
    cells: cell[],
}

export interface cell {
    id: number,
    name: string,
    size: number,
    amount: number
}


