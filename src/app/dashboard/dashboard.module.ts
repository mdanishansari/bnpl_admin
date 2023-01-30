import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContainerComponent } from './container/container.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    ContainerComponent,
    HomeComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
