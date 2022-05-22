import {Component, OnInit} from '@angular/core';
import {AdminMainPageWrapperComponent} from "../admin-main-page -wrapper/admin-main-page-wrapper.component";
import {RequestService} from "../../services/request.service";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {IRequestData} from "./request-component/IRequestData";
import {HttpClient} from "@angular/common/http";
import {PeopleService} from "../../../login/services/people.service";
import {ITransaction} from "../../../../interfaces/transaction";
import {map} from "rxjs";
import {ITransactionFile} from "../../../../interfaces/transaction_file";
import {FilemanagerService} from "../../services/filemanager.service";
import {ModalWorker} from "../../services/modalworker.service";
import {RequestComponent} from "./request-component/request.component";
import {Router} from "@angular/router";
import {MessagesService} from "../../../services/messages.service";

@Component({
    selector: 'personal-area',
    templateUrl: './admin-request.component.html',
    styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

    MAX_COMMENT_LENGTH = 2048
    DISCARDED_MESSAGE = "Запрос отклонен".toUpperCase()
    APPROVED_MESSAGE = "UCoins НАЧИСЛЕНЫ!"

    requests: ITransaction[]

    public currentRequestComponent: RequestComponent | null
    acceptForm: FormGroup
    discardForm: FormGroup

    message: String | null

    /*
    public accrualInputControl = new FormControl(0, [
        Validators.required, Validators.min(0)
    ]);


    public commentInputControl = new FormControl('')*/

    constructor(private _service: RequestService,
                public _modals: ModalWorker,
                private _router: Router,
                private _messages: MessagesService) {

    }

    ngOnInit(): void {
        this.getRequestData()
        this.createAcceptForm()
        this.createDiscardForm()

        console.log("message = " + this.message)
    }

    createAcceptForm() {
        const coins = new FormControl(1, [
            Validators.required, Validators.min(1)
        ]);
        const comment = new FormControl("", [
            Validators.maxLength(this.MAX_COMMENT_LENGTH)
        ]);

        this.acceptForm = new FormGroup({
            coins: coins,
            comment: comment
        })
    }

    createDiscardForm() {
        const comment = new FormControl("", [
            Validators.maxLength(this.MAX_COMMENT_LENGTH)
        ]);

        this.discardForm = new FormGroup({
            comment: comment
        })
    }

    getRequestData() {
        this._service.getRequests()
            .subscribe((res: ITransaction[]) => {
                //this.requests = res.map(this.processTransaction, this)
                this.requests = res
                console.log(this.requests)
            })
    }

    public closeAcceptModal() {
        this.currentRequestComponent = null
        this._modals.closeModal('modal-accept')
    }

    public closeDiscardModal() {
        this.currentRequestComponent = null
        this._modals.closeModal('modal-discard')
    }

    public submitAccept() {
        if (this.currentRequestComponent) {
            var amount = this.acceptForm.controls["coins"].value
            var comment = this.acceptForm.controls["comment"].value

            this._service.approve(this.currentRequestComponent.data, amount, comment)
                .subscribe(() => {
                    console.log("Coins are accrued")
                    this.message = this.APPROVED_MESSAGE
                    //window.location.reload()
                    var idx = this.requests.findIndex(t => {
                        return JSON.stringify(t) === JSON.stringify(this.currentRequestComponent?.data)
                    })
                    this.requests.splice(idx, 1)
                    this.closeAcceptModal()
                })
        }
    }

    public submitDiscard() {
        if (this.currentRequestComponent) {
            var comment = this.discardForm.controls["comment"].value

            this._service.cancel(this.currentRequestComponent.data,
                                 comment)
                .subscribe(() => {
                    console.log("Coins are discarded")
                    this.message = this.DISCARDED_MESSAGE
                    //window.location.reload()
                    var idx = this.requests.findIndex(t => {
                        return JSON.stringify(t) === JSON.stringify(this.currentRequestComponent?.data)
                    })
                    this.requests.splice(idx, 1)
                    this.closeDiscardModal()
                })
        }
    }

    public closeMessage() {
        this._messages.hide("reg-message")
    }

}
