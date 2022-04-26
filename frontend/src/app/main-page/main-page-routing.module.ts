import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginReactFormComponent} from "../login/components/login-react-form/login-react-form.component";
import {MerchStoreComponent} from "./components/merch-store/merch-store.component";
import {MainPageWrapperComponent} from "./components/main-page-wrapper/main-page-wrapper.component";
import {MainRegulationsComponent} from "./components/main-regulations/main-regulations.component";



const childrenRoutes: Routes = [
    {
        path: 'merch', component: MerchStoreComponent, children: [
             // {path: 'present', component: MainPresentComponent}
        ]
    },
    {path: 'regulation', component: MainRegulationsComponent},
    {
        path: 'personal-area', loadChildren: () => import('../personal-area/personal-area.module')
            .then(mod => mod.PersonalAreaModule)
    },
]


const routes: Routes = [
    {path: 'main-page', component: MainPageWrapperComponent},
    {path: '', component: MainPageWrapperComponent, children: childrenRoutes},
    {path: '**', component: MainPageWrapperComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainPageRoutingModule {
}
