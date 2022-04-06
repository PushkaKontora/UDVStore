import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginReactFormComponent} from "../login/components/login-react-form/login-react-form.component";
import {MerchStoreComponent} from "./merch-store/merch-store.component";



const routes: Routes = [
    {path: '', component: MerchStoreComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainPageRoutingModule {}
