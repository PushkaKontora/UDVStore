import {Injectable} from "@angular/core";
import {ITransaction} from "../../../../interfaces/transaction";
import {IBoughtProduct} from "./interfaces/IBoughtProduct";
import {IAcceptedRequest} from "./interfaces/IAcceptedRequest";
import {IRejectedRequest} from "./interfaces/IRejectedRequest";
import {ISentGift} from "./interfaces/ISentGift";
import {IReceivedGift} from "./interfaces/IReceivedGift";
import {IHistoryEvent} from "./interfaces/components/IHistoryEvent";
import {ArgumentOutOfRangeError} from "rxjs";
import {incline} from "lvovich";
import {IProfile} from "../../../../interfaces/profile";
import {LvovichPersonT} from "lvovich/lib/incline";
import {IDeposit} from "./interfaces/IDeposit";
import {IUser} from "../../../../interfaces/interfaces";


// TODO: add photo!!!!!!!!!!!!!!
@Injectable({
    providedIn: 'root'
})
export class HistoryEventFactory
{
    private static readonly _creators: Map<number, Function> = new Map([
        [1, HistoryEventFactory.createBoughtProduct],
        [2, HistoryEventFactory.createDeposit],
        [3, HistoryEventFactory.createGift],
        [5, HistoryEventFactory.createRejectedRequest],
        [6, HistoryEventFactory.createAcceptedRequest]
    ]);

    public static create(transaction: ITransaction, user: IUser): IHistoryEvent | null
    {
        const creator = HistoryEventFactory._creators.get(transaction.type);
        if (!creator)
            return null;

        return creator(transaction, user);
    }

    public static createBoughtProduct(transaction: ITransaction, user: IUser): IBoughtProduct
    {
        return {
            title: transaction.order.product.name,
            photo: transaction.order.product.photo,
            date: transaction.created_at,
            size: transaction.order.product.size,
            amount: transaction.order.amount,
            price: -transaction.accrual,
        }
    }

    public static createDeposit(transaction: ITransaction, user: IUser): IDeposit
    {
        return {
            title: "UDV-store",
            photo: "",
            date: transaction.created_at,
            price: transaction.accrual,
        }
    }

    public static createAcceptedRequest(transaction: ITransaction, user: IUser): IAcceptedRequest
    {
        return {
            title: "UDV-store одобрил заявку",
            photo: "",
            date: transaction.created_at,
            comment: transaction.response.description,
            description: transaction.description,
            price: transaction.accrual,
        }
    }

    public static createRejectedRequest(transaction: ITransaction, user: IUser): IRejectedRequest
    {
        return {
            title: "UDV-store отклонил заявку",
            photo: "",
            date: transaction.created_at,
            comment: transaction.response.description,
            description: transaction.description,
        }
    }

    public static createGift(transaction: ITransaction, user: IUser): IHistoryEvent
    {
        if (transaction.from_profile.id === user.id)
        {
            return HistoryEventFactory.createSentGift(transaction, user);
        }
        else if (transaction.to_profile.id === user.id)
        {
            return HistoryEventFactory.createReceivedGift(transaction, user);
        }

        throw new ArgumentOutOfRangeError();
    }

    public static createSentGift(transaction: ITransaction, user: IUser): ISentGift
    {
        const receiver: IProfile = transaction.to_profile;

        const person: LvovichPersonT = incline(
            {first: receiver.first_name, last: receiver.last_name},
            "dative"
        );

        return {
            title: `ПОДАРОК ${person.first} ${person.last}`,
            photo: "",
            date: transaction.created_at,
            price: -transaction.accrual,
        }
    }

    public static createReceivedGift(transaction: ITransaction, user: IUser): IReceivedGift
    {
        const sender: IProfile = transaction.from_profile;

        const person: LvovichPersonT = incline(
            {first: sender.first_name, last: sender.last_name},
            "genitive"
        );

        return {
            title: `ПОДАРОК от ${person.first} ${person.last}`,
            photo: "",
            date: transaction.created_at,
            comment: transaction.description,
            price: transaction.accrual,
        }
    }
}
