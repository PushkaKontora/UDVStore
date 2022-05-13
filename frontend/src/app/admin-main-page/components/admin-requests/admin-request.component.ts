import { Component, OnInit } from '@angular/core';
import {AdminMainPageWrapperComponent} from "../admin-main-page -wrapper/admin-main-page-wrapper.component";
import {IRequestData} from "./request-component/IRequestData";
import {RequestService} from "../../services/request.service";
import {HttpClient} from "@angular/common/http";
import {PeopleService} from "../../../login/services/people.service";
import {ITransaction} from "../../../../interfaces/transaction";

@Component({
  selector: 'personal-area',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

  requests: IRequestData[]

  constructor(private _service: RequestService) {

  }

  ngOnInit(): void {
    this.getRequestData()
  }

  getRequestData() {
    this._service.getRequests()
        .subscribe((res: ITransaction[]) => {
          this.requests = res.map(this.processTransaction)
          console.log(this.requests)
        })
  }

  splitPath(path: string): string {
    const fileDesc = path.split('/')
    return fileDesc[fileDesc.length - 1]
  }

  processTransaction(t: ITransaction): IRequestData {
    return {
      photoUrl: t.from_profile.photo,
      name: t.from_profile.first_name + ' ' + t.from_profile.last_name,
      description: this.splitPath(t.description),
      filenames: t.files.map((file) => file.filename)
    }
  }

}
