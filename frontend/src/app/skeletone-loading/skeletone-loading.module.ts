import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkeletoneComponent} from "./skeletone/skeletone.component";


@NgModule({
    declarations: [
        SkeletoneComponent
    ],
    exports: [
        SkeletoneComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SkeletoneLoadingModule {
}
