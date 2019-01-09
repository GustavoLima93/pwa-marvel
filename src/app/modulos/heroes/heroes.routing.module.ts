
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { HeroesComponent, HeroeslistComponent } from './components-heroesModule';


const heroesRoutes: Routes = [
    {
        path:'',
        component:HeroesComponent,
        children:[
          {
            path:'list',
            component:HeroeslistComponent
          }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(heroesRoutes)],
    exports: [RouterModule]
  })
  export class HeroesRoutingModule{}