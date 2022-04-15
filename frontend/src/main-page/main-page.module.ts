import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageRoutingModule} from "./main-page-routing.module";
import {MerchStoreComponent} from "./merch-store/merch-store.component";
import {MainPageWrapperComponent} from "./main-page-wrapper/main-page-wrapper.component";
import {MainRegulationsComponent} from "./main-regulations/main-regulations.component";


@NgModule({
    declarations: [
        MerchStoreComponent,
        MainPageWrapperComponent,
        MainRegulationsComponent
    ],
    imports: [
        CommonModule,
        MainPageRoutingModule
    ]
})
export class MainPageModule {
}
