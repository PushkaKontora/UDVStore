import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRequestComponent} from "./components/admin-requests/admin-request.component";
import {AdminMainPageRoutingModule} from "./admin-main-page-routing.module";
import {AdminMainPageWrapperComponent} from "./components/admin-main-page -wrapper/admin-main-page-wrapper.component";
import {AdminScoreComponent} from "./components/admin-score/admin-score.component";
import {AdminOrdersComponent} from "./components/admin-orders/admin-orders.component";
import {AdminAccrualComponent} from "./components/admin-accrual/admin-accrual.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminRulesComponent} from "./components/admin-rules/admin-rules.component";
import {TuiSheetModule} from '@taiga-ui/addon-mobile';
import {TuiAvatarModule, TuiDataListWrapperModule, TuiMultiSelectModule} from "@taiga-ui/kit";
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiDropdownControllerModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiLetModule} from "@taiga-ui/cdk";
import {SearchStringService} from "../services/searchString.service";
import {PeopleService} from "../login/services/people.service";
import {StoreService} from "../main-page/services/store.service";
import {Router} from "@angular/router";
import { AdminOrdersAllOrdersComponent } from './components/admin-orders/childrens/admin-orders-all-orders/admin-orders-all-orders.component';
import { AdminOrdersNewOrdersComponent } from './components/admin-orders/childrens/admin-orders-new-orders/admin-orders-new-orders.component';
import { AdminOrdersProcessingOrdersComponent } from './components/admin-orders/childrens/admin-orders-processing-orders/admin-orders-processing-orders.component';
import {RequestService} from "./services/request.service";


@NgModule({
    declarations: [
        AdminRequestComponent,
        AdminMainPageWrapperComponent,
        AdminScoreComponent,
        AdminOrdersComponent,
        AdminAccrualComponent,
        AdminRulesComponent,
        AdminOrdersAllOrdersComponent,
        AdminOrdersNewOrdersComponent,
        AdminOrdersProcessingOrdersComponent
    ],
    imports: [
        CommonModule,
        AdminMainPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TuiMultiSelectModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiTextfieldControllerModule,
        TuiLetModule,
        TuiAvatarModule,
        TuiDropdownControllerModule,
    ],
     providers: [SearchStringService, RequestService]
})
export class AdminMainPageModule {
    constructor(
        private _peopleService: PeopleService,
        private _searchStringService: SearchStringService,
    ) {
        this._peopleService.getProfilesForAdminPage();
        this._searchStringService.getProfiles();
    }
}
