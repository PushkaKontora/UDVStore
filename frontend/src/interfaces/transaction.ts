import {IProfile} from "./profile";
import {IOrder} from "./order";
import {ITransactionFile} from "./transaction_file";

export interface ITransaction
{
    'id': number,
    'type': number,
    'from_profile': IProfile,
    'to_profile': IProfile,
    'accrual': number,
    'description': string,
    'created_at': string,
    'order': IOrder,
    'files': ITransactionFile[]
}
