import {cell, products} from "./interfaces";
import {IProfile} from "./profile";

export interface IOrder {
    "id": number,
    "created_at": string,
    "order": {
        "id": number,
        "profile": IProfile,
        "status": number,
        "product": {
            "id": number,
            "name": string,
            "photo": string,
            "description": string,
            "price": number,
            "size": number,
            "amount": number
        },
        "amount": number,
        "in_cart": boolean,
        "total": number
    }
}
