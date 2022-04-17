export interface IUser {
    username: string; // email;
    password: string;
    id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    balance: number;
    image?: string; // фото - пока нет.
}
// --proxy-config proxy.config.json
// "options": {
//     "browserTarget": "frontend:build",
//         "proxyConfig": "proxy.config.json"
// },
