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
import {TuiDataListWrapperModule, TuiMultiSelectModule} from "@taiga-ui/kit";
import {TuiDataListModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiLetModule} from "@taiga-ui/cdk";


@NgModule({
    declarations: [
        AdminRequestComponent,
        AdminMainPageWrapperComponent,
        AdminScoreComponent,
        AdminOrdersComponent,
        AdminAccrualComponent,
        AdminRulesComponent
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
    ]
})
export class AdminMainPageModule {
}
