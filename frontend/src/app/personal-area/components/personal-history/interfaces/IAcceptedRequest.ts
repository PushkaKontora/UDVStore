import {IPriced} from "./components/IPriced";
import {ICommented} from "./components/ICommented";
import {IDescriptive} from "./components/IDescriptive";

export interface IAcceptedRequest extends IPriced, ICommented, IDescriptive {
}
