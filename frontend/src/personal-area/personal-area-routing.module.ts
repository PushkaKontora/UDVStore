import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalAreaComponent} from "./components/personal-area/personal-area.component";
import {MerchStoreComponent} from "../main-page/merch-store/merch-store.component";
import {MainRegulationsComponent} from "../main-page/main-regulations/main-regulations.component";
import {PersonalAreaWrapperComponent} from "./components/personal-area-wrapper/personal-area-wrapper.component";



const childrenRoutes:Routes =[
    {path: 'data', component: PersonalAreaComponent},
    // {path: 'regulation', component: MainRegulationsComponent},
    // {
    //     path: 'personal-area', loadChildren: () => import('../personal-area/personal-area.module')
    //         .then(mod => mod.PersonalAreaModule)
    // },
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
