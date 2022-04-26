import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginReactFormComponent} from "./login/components/login-react-form/login-react-form.component";

const routes: Routes = [
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
