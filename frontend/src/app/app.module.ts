import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule } from "@taiga-ui/core";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginModule} from "../login/login.module";
import {SkeletoneLoadingModule} from "../skeletone-loading/skeletone-loading.module";
import {TuiSheetModule} from "@taiga-ui/addon-mobile";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LoginModule,
        TuiRootModule,
        BrowserAnimationsModule,
        SkeletoneLoadingModule,
        TuiSheetModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
