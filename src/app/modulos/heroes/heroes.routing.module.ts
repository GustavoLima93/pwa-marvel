
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { HeroesComponent, HeroeslistComponent,HeroesdetailsComponent } from './components-heroesModule';


const heroesRoutes: Routes = [
    {
        path:'',
        component:HeroesComponent,
        children:[
          {
            path:'list',
            component:HeroeslistComponent
          },
          {
            path:':id',
            component:HeroesdetailsComponent
          }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(heroesRoutes)],
    exports: [RouterModule]
  })
  export class HeroesRoutingModule{}