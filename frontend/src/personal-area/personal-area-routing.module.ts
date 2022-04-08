import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalAreaComponent} from "./components/personal-area/personal-area.component";



const childrenRoutes:Routes =[

]


const routes: Routes = [
    {path: 'personal-area', component: PersonalAreaComponent},
    {path: '', component: PersonalAreaComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalAreaRoutingModule {}
