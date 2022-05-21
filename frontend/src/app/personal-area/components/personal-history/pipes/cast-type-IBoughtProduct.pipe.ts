import {Pipe, PipeTransform} from '@angular/core';
import {IBoughtProduct} from "../interfaces/IBoughtProduct";
import {IReceivedGift} from "../interfaces/IReceivedGift";
import {IRejectedRequest} from "../interfaces/IRejectedRequest";
import {IAcceptedRequest} from "../interfaces/IAcceptedRequest";
import {IDeposit} from "../interfaces/IDeposit";
import {ISentGift} from "../interfaces/ISentGift";
import {ICountable} from "../interfaces/components/ICountable";

@Pipe({
    name: 'castType'
})
export class CastTypeIBoughtProductPipe implements PipeTransform {

    transform(value: any, type: any): any {
        switch (type) {
            case "IBoughtProduct": {
                return <IBoughtProduct>value;
            }

            case "IDeposit": {
                return <IDeposit>value;
            }

            case "IAcceptedRequest": {
                return <IAcceptedRequest>value;
            }

            case "ISentGift": {
                return <ISentGift>value;
            }

            case "IRejectedRequest": {
                return <IRejectedRequest>value;
            }

            case "IReceivedGift": {
                return <IReceivedGift>value;
            }

            default: {
                return null;
            }
        }
    }
}
