import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueComponent } from './revenue/revenue.component';
import { VisitorComponent } from './visitor/visitor.component';
import { ReportRouter } from './report.routes';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [RevenueComponent, VisitorComponent],
  imports: [
    CommonModule,
    ReportRouter,
    ChartsModule
  ]
})
export class ReportModule { }
