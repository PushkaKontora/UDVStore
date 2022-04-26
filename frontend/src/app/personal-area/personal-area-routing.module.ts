import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalAreaComponent} from "./components/personal-area/personal-area.component";
import {MerchStoreComponent} from "../main-page/components/merch-store/merch-store.component";
import {MainRegulationsComponent} from "../main-page/components/main-regulations/main-regulations.component";
import {PersonalAreaWrapperComponent} from "./components/personal-area-wrapper/personal-area-wrapper.component";
import {PersonalOrdersComponent} from "./components/personal-orders/personal-orders.component";
import {PersonalHistoryComponent} from "./components/personal-history/personal-history.component";
import {PersonalActivityComponent} from "./components/personal-activity/personal-activity.component";



const childrenRoutes:Routes =[
    {path: 'data', component: PersonalAreaComponent},
    {path: 'orders', component: PersonalOrdersComponent},
    {path: 'history', component: PersonalHistoryComponent},
    {path: 'write-activity', component: PersonalActivityComponent},
]



const routes: Routes = [
    {path: 'personal-area', component: PersonalAreaWrapperComponent},
    {path: '', component: PersonalAreaWrapperComponent, children: childrenRoutes}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalAreaRoutingModule {}
