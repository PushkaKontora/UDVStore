import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginReactFormComponent} from "./components/login-react-form/login-react-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PeopleService} from "./people.service";
import {SpaBodyComponent} from "./components/spa-body/spa-body.component";
import {AppRoutingModule} from "../app/app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {LoginRoutingModule} from "./login-routing.module";


@NgModule({
    declarations: [
        LoginReactFormComponent,
        SpaBodyComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        LoginRoutingModule
    ],
    exports: [
        SpaBodyComponent
    ],
    providers: [PeopleService]
})
export class LoginModule {
}
