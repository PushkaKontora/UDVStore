import {IHistoryEvent} from "./IHistoryEvent";

export interface ICommented extends IHistoryEvent {
    readonly comment: string;
}
