import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesComponent, HeroeslistComponent,HeroesdetailsComponent } from './components-heroesModule';
import { HeroesRoutingModule } from './heroes.routing.module';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeroesComponent,
    HeroeslistComponent,
    HeroesdetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot()
  ]
})
export class HeroesModule { }
