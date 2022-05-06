export interface IProfile{
    "id": number,
    "username": string,
    "first_name": string,
    "last_name": string,
    "email": string,
    "patronymic": string,
    "balance": number,
    "photo": string | null,
    "is_staff": boolean
}
