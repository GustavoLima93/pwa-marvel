import { HeroesService } from './../../../../services/heroes.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Resp, Heroes } from 'src/app/models';

@Component({
  selector: 'list-heroeslist',
  templateUrl: './heroeslist.component.html',
  styleUrls: ['./heroeslist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeroeslistComponent implements OnInit {

  public heros:Heroes[]
  public totalHeros:number
  public showBoundaryLinks = true
  

  constructor(
    private heroService: HeroesService
  ) { }

  ngOnInit() {
    this.getHeros();
  }


  getHeros (offset?:string) {    
    let page = ''
    offset ? page = offset : page = '' // trataiva para offset

    this.heroService.getHeroes(page).subscribe((Response:Resp) =>{
      this.heros = Response.data.results
      this.totalHeros = Response.data.total
    },err =>{
      console.log(err);
    })
  }

  pageChanged(event: any) {
    let offset = String(event.page - 1);    
    offset === '0' ? offset = '' : offset = offset + '0'; // tratativa caso a pagina selecionada seja a primeira 
    return this.getHeros(offset);
  }




}
