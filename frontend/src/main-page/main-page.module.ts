import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageRoutingModule} from "./main-page-routing.module";
import {MerchStoreComponent} from "./merch-store/merch-store.component";
import {MainPageWrapperComponent} from "./main-page-wrapper/main-page-wrapper.component";
import {MainRegulationsComponent} from "./main-regulations/main-regulations.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreService} from "./store.service";
import {SkeletoneLoadingModule} from "../skeletone-loading/skeletone-loading.module";
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleService} from "../login/people.service";


@NgModule({
    declarations: [
        MerchStoreComponent,
        MainPageWrapperComponent,
        MainRegulationsComponent,
    ],
    imports: [
        CommonModule,
        MainPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SkeletoneLoadingModule
    ],
    providers: [StoreService]
})
export class MainPageModule {
    constructor(
        private _peopleService: PeopleService,
        private _storeService: StoreService
    ) {
        this._peopleService.isLoaded = true;
        this._peopleService.getUserProduct()
    }
}
