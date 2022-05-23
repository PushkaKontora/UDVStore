import {Pipe, PipeTransform} from '@angular/core';
import {IBoughtProduct} from "../../../../personal-area/components/personal-history/interfaces/IBoughtProduct";
import {IReceivedGift} from "../../../../personal-area/components/personal-history/interfaces/IReceivedGift";
import {IRejectedRequest} from "../../../../personal-area/components/personal-history/interfaces/IRejectedRequest";
import {IAcceptedRequest} from "../../../../personal-area/components/personal-history/interfaces/IAcceptedRequest";
import {IDeposit} from "../../../../personal-area/components/personal-history/interfaces/IDeposit";
import {ISentGift} from "../../../../personal-area/components/personal-history/interfaces/ISentGift";
import {ICountable} from "../../../../personal-area/components/personal-history/interfaces/components/ICountable";

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
