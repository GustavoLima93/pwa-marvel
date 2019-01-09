import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent, HeroeslistComponent } from './components-heroesModule';
import { HeroesRoutingModule } from './heroes.routing.module';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroeslistComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot()
  ]
})
export class HeroesModule { }
