import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageRoutingModule} from "./main-page-routing.module";
import {MerchStoreComponent} from "./components/merch-store/merch-store.component";
import {MainPageWrapperComponent} from "./components/main-page-wrapper/main-page-wrapper.component";
import {MainRegulationsComponent} from "./components/main-regulations/main-regulations.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreService} from "./services/store.service";
import {SkeletoneLoadingModule} from "../skeletone-loading/skeletone-loading.module";
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleService} from "../login/services/people.service";
import {SearchStringService} from "../services/searchString.service";
import {TuiAvatarModule, TuiDataListWrapperModule, TuiMultiSelectModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiDataListModule, TuiDropdownControllerModule, TuiTextfieldControllerModule} from "@taiga-ui/core";


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
        SkeletoneLoadingModule,
        TuiAvatarModule,
        TuiMultiSelectModule,
        TuiLetModule,
        TuiTextfieldControllerModule,
        TuiDropdownControllerModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        TuiDataListModule,
    ],
    providers: [
        StoreService,
        SearchStringService
    ]
})
export class MainPageModule {
    constructor(
        private _router: Router,
        private _peopleService: PeopleService,
        private _storeService: StoreService,
        private _searchStringService: SearchStringService,
    ) {
        this._peopleService.getUserProduct();
        this._searchStringService.getProfiles();
    }
}
