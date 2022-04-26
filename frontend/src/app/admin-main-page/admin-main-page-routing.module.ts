import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminRequestComponent} from "./components/admin-requests/admin-request.component";
import {MerchStoreComponent} from "../main-page/components/merch-store/merch-store.component";
import {MainRegulationsComponent} from "../main-page/components/main-regulations/main-regulations.component";
import {AdminMainPageWrapperComponent} from "./components/admin-main-page -wrapper/admin-main-page-wrapper.component";
import {AdminScoreComponent} from "./components/admin-score/admin-score.component";
import {AdminOrdersComponent} from "./components/admin-orders/admin-orders.component";
import {AdminAccrualComponent} from "./components/admin-accrual/admin-accrual.component";
import {AdminRulesComponent} from "./components/admin-rules/admin-rules.component";



const childrenRoutes:Routes =[
    {path: 'accrual', component: AdminAccrualComponent},
    {path: 'requests', component: AdminRequestComponent},
    {path: 'orders', component: AdminOrdersComponent},
    {path: 'score', component: AdminScoreComponent},
    {path: 'rules', component: AdminRulesComponent},
]



const routes: Routes = [
    {path: 'admin', component: AdminMainPageWrapperComponent},
    {path: '', component: AdminMainPageWrapperComponent, children: childrenRoutes}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminMainPageRoutingModule {}
