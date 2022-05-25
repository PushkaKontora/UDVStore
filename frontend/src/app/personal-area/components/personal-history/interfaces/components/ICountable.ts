import {IHistoryEvent} from "./IHistoryEvent";

export interface ICountable extends IHistoryEvent {
    readonly size: number;
    readonly amount: number;
}
