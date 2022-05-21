import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalAreaComponent} from "./components/personal-area/personal-area.component";
import {PersonalAreaRoutingModule} from "./personal-area-routing.module";
import {PersonalAreaWrapperComponent} from "./components/personal-area-wrapper/personal-area-wrapper.component";
import {PersonalOrdersComponent} from "./components/personal-orders/personal-orders.component";
import {PersonalHistoryComponent} from "./components/personal-history/personal-history.component";
import {PersonalActivityComponent} from "./components/personal-activity/personal-activity.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TypeofPipe} from "./components/personal-history/pipes/typeof.pipe";
import {CastTypePipe} from "./components/personal-history/pipes/cast-type.pipe";


@NgModule({
    declarations: [
        PersonalAreaComponent,
        PersonalAreaWrapperComponent,
        PersonalOrdersComponent,
        PersonalHistoryComponent,
        PersonalActivityComponent,
        TypeofPipe,
        CastTypePipe,
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
