import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./components/home/home.component";
import { ContainerComponent } from "./container/container.component";

const routes: Routes = [
    {
        path: '', component: ContainerComponent,
        children: [
            { path: '', component: HomeComponent },
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }