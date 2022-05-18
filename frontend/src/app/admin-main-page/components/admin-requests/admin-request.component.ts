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

@Component({
    selector: 'personal-area',
    templateUrl: './admin-request.component.html',
    styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

    MAX_COMMENT_LENGTH = 2048

    requests: ITransaction[]
    acceptForm: FormGroup

    /*
    public accrualInputControl = new FormControl(0, [
        Validators.required, Validators.min(0)
    ]);


    public commentInputControl = new FormControl('')*/

    constructor(private _service: RequestService,
                public _modals: ModalWorker) {

    }

    ngOnInit(): void {
        this.getRequestData()
        this.createAcceptForm()
    }

    createAcceptForm() {
        var coins = new FormControl(1, [
            Validators.required, Validators.min(1)
        ])
        var comment = new FormControl("", [
            Validators.maxLength(this.MAX_COMMENT_LENGTH)
        ])

        this.acceptForm = new FormGroup({
            coins: coins,
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

    public tryAccept() {
        this._service.approve()
    }

}
