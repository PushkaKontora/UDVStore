import {cell, products} from "./interfaces";
import {IProfile} from "./profile";

export interface IOrder {
    "id": number,
    "profile": IProfile,
    "status": number,
    "product": products,
    "amount": number,
    "in_cart": boolean,
    "total": number
}
