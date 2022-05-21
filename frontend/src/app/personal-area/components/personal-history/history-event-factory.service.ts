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


// TODO: must will add photo
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

    public static create(transaction: ITransaction): IHistoryEvent | null
    {
        const creator = HistoryEventFactory._creators.get(transaction.type);
        if (!creator)
            return null;

        return creator(transaction);
    }

    public static createBoughtProduct(transaction: ITransaction): IBoughtProduct
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

    public static createDeposit(transaction: ITransaction): IDeposit
    {
        return {
            title: "UDV-store",
            photo: "",
            date: transaction.created_at,
            price: transaction.accrual,
        }
    }

    public static createAcceptedRequest(transaction: ITransaction): IAcceptedRequest
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

    public static createRejectedRequest(transaction: ITransaction): IRejectedRequest
    {
        return {
            title: "UDV-store отклонил заявку",
            photo: "",
            date: transaction.created_at,
            comment: transaction.response.description,
            description: transaction.description,
        }
    }

    public static createGift(transaction: ITransaction): IHistoryEvent
    {
        // TODO: set id of authenticated user to '228'
        if (transaction.from_profile.id === 228)
        {
            return HistoryEventFactory.createSentGift(transaction);
        }
        else if (transaction.to_profile.id === 228)
        {
            return HistoryEventFactory.createReceivedGift(transaction);
        }

        throw new ArgumentOutOfRangeError();
    }

    public static createSentGift(transaction: ITransaction): ISentGift
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

    public static createReceivedGift(transaction: ITransaction): IReceivedGift
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
