import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    TuiDataListModule,
    TuiDropdownControllerModule,
    TuiRootModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginModule} from "./login/login.module";
import {SkeletoneLoadingModule} from "./skeletone-loading/skeletone-loading.module";
import {TuiSheetModule} from "@taiga-ui/addon-mobile";
import {TuiAvatarModule, TuiDataListWrapperModule, TuiMultiSelectModule} from "@taiga-ui/kit";
import {TuiLetModule} from "@taiga-ui/cdk";
import { CookieService } from 'ngx-cookie-service';
import { TypeofPipe } from './personal-area/components/personal-history/pipes/typeof.pipe';
import { CastTypePipe } from './personal-area/components/personal-history/pipes/cast-type.pipe';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LoginModule,
        TuiRootModule,
        BrowserAnimationsModule,
        SkeletoneLoadingModule,
        TuiSheetModule,
        TuiMultiSelectModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiTextfieldControllerModule,
        TuiLetModule,
        TuiAvatarModule,
        TuiDropdownControllerModule,
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
