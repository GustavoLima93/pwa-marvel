import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SeriesRoutingModule } from './series.routing.module';
import { SeriesComponent, SerieslistComponent, SeriesdetailComponent } from './components-seriesModule';


@NgModule({
  declarations: [
    SeriesComponent,
    SerieslistComponent,
    SeriesdetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SeriesRoutingModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot()
  ]
})
export class SeriesModule { }
