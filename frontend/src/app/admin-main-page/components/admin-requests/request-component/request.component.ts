import {Component, Input, OnInit} from '@angular/core';
import {IRequestData} from "./IRequestData";
import {RequestService} from "../../../services/request.service";
import {ITransaction} from "../../../../../interfaces/transaction";
import {ModalWorker} from "../../../services/modalworker.service";
import {FilemanagerService} from "../../../services/filemanager.service";
import {AdminRequestComponent} from "../admin-request.component";

@Component({
  selector: 'app-request-component',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

    @Input() data: ITransaction

    constructor(private _service: RequestService,
                public _modals: ModalWorker,
                private _parent: AdminRequestComponent) {

    }

    ngOnInit(): void {

    }

    public getFullName(): string {
        return this.data.from_profile.first_name + ' ' + this.data.from_profile.last_name;
    }

    public getCutFilename(filename: string): string {
        return FilemanagerService.getFilename(filename)
    }

    public approve() {
        this._parent.currentRequestComponent = this
        this._modals.openModal('modal-accept')
        console.log(this._parent.currentRequestComponent)
    }

    public discard() {
        this._parent.currentRequestComponent = this
        this._modals.openModal('modal-discard')
        console.log(this._parent.currentRequestComponent)
    }

}
