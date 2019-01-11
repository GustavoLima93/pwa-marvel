import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesComponent, HeroeslistComponent,HeroesdetailsComponent } from './components-heroesModule';
import { HeroesRoutingModule } from './heroes.routing.module';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';




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
    CollapseModule.forRoot()
  ]
})
export class HeroesModule { }
