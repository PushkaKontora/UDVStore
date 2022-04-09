import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalAreaComponent} from "./components/personal-area/personal-area.component";
import {PersonalAreaRoutingModule} from "./personal-area-routing.module";
import {PersonalAreaWrapperComponent} from "./components/personal-area-wrapper/personal-area-wrapper.component";


@NgModule({
    declarations: [
        PersonalAreaComponent,
        PersonalAreaWrapperComponent
    ],
    imports: [
        CommonModule,
        PersonalAreaRoutingModule
    ]
})
export class PersonalAreaModule {
}
