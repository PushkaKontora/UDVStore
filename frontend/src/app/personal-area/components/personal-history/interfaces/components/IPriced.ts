import {IHistoryEvent} from "./IHistoryEvent";

export interface IPriced extends IHistoryEvent {
    readonly price: number;
}
