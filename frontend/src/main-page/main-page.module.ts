import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageRoutingModule} from "./main-page-routing.module";
import {MerchStoreComponent} from "./merch-store/merch-store.component";


@NgModule({
    declarations: [
        MerchStoreComponent
    ],
    imports: [
        CommonModule,
        MainPageRoutingModule
    ]
})
export class MainPageModule {
}
