import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginReactFormComponent} from "./components/login-react-form/login-react-form.component";

const routes: Routes = [
    {
        path: 'main-page', loadChildren: () => import('../main-page/main-page.module')
            .then(mod => mod.MainPageModule)
    },
    {path: '', component: LoginReactFormComponent},
    {path: '**', component: LoginReactFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}
