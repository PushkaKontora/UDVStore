import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalAreaComponent} from "./components/personal-area/personal-area.component";
import {PersonalAreaRoutingModule} from "./personal-area-routing.module";
import {PersonalAreaWrapperComponent} from "./components/personal-area-wrapper/personal-area-wrapper.component";
import {PersonalOrdersComponent} from "./components/personal-orders/personal-orders.component";
import {PersonalHistoryComponent} from "./components/personal-history/personal-history.component";
import {PersonalActivityComponent} from "./components/personal-activity/personal-activity.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CastTypeIBoughtProductPipe} from "./components/personal-history/pipes/cast-type-IBoughtProduct.pipe";
import {CastTypeNumberPipe} from "./components/personal-history/pipes/cast-type-number.pipe";

@NgModule({
    declarations: [
        PersonalAreaComponent,
        PersonalAreaWrapperComponent,
        PersonalOrdersComponent,
        PersonalHistoryComponent,
        PersonalActivityComponent,
        CastTypeIBoughtProductPipe,
        CastTypeNumberPipe
    ],
    imports: [
        CommonModule,
        PersonalAreaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class PersonalAreaModule {
}
