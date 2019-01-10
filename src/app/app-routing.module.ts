import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components-appModule';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'heroes',
    loadChildren:'./modulos/heroes#HeroesModule',
  },
  {
    path: 'series',
    loadChildren:'./modulos/series#SeriesModule',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
