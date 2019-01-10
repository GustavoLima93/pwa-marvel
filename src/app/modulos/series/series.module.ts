import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  ]
})
export class SeriesModule { }
