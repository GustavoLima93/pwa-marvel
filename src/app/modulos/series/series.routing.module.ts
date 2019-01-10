import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { SeriesComponent, SerieslistComponent, SeriesdetailComponent } from './components-seriesModule';


const seriesRoutes: Routes = [
    {
        path:'',
        component:SeriesComponent,
        children:[
          {
            path:'list',
            component:SerieslistComponent
          },
          {
            path:':id',
            component:SeriesdetailComponent
          }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(seriesRoutes)],
    exports: [RouterModule]
  })
  export class SeriesRoutingModule{}
