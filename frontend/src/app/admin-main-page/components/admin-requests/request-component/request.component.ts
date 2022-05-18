import {Component, Input, OnInit} from '@angular/core';
import {IRequestData} from "./IRequestData";
import {RequestService} from "../../../services/request.service";
import {ITransaction} from "../../../../../interfaces/transaction";
import {ModalWorker} from "../../../services/modalworker.service";
import {FilemanagerService} from "../../../services/filemanager.service";

@Component({
  selector: 'app-request-component',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

    @Input() data: ITransaction

    constructor(private _service: RequestService,
                public _modals: ModalWorker) {

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
        //this._service.approve()
    }

    public discard() {

    }

}
