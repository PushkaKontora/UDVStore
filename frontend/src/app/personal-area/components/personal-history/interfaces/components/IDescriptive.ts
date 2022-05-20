import {IHistoryEvent} from "./IHistoryEvent";

export interface IDescriptive extends IHistoryEvent {
    readonly description: string;
}
