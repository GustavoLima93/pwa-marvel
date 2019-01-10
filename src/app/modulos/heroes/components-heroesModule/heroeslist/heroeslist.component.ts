import { HeroesService } from './../../../../services/heroes.service';
import { Component, OnInit, ViewEncapsulation, DoCheck, OnChanges, AfterViewInit } from '@angular/core';
import { Resp, Heroes } from 'src/app/models';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'list-heroeslist',
  templateUrl: './heroeslist.component.html',
  styleUrls: ['./heroeslist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeroeslistComponent implements OnInit, DoCheck, AfterViewInit {

  public heros: Heroes[];
  public totalHeros: number;
  public showBoundaryLinks = true;
  public notConflict = false;
  public name: string;
  public nameStartsWith: string;
  public currentPage:number;

  constructor(
    private heroService: HeroesService,

  ) {  
  }

  ngOnInit() {
    this.getHeros();   
  }

  ngDoCheck() {
    this.name && this.nameStartsWith ? this.notConflict = true :  this.notConflict = false;        
  }

  ngAfterViewInit() {

    if(this.currentPage = 1){
      this.getCurrentPage();
    }
    console.log('carrregou')
   
  }
  

  getCurrentPage() {
    return this.currentPage = Number(this.heroService.getOffSet())/10+1;
  }


  getHeros(offset?: string) {
    let page = ''
    offset ? page = offset : page = '' // trataiva para offset

    this.heroService.getHeroes(page).subscribe((Response: Resp) => {
      this.heros = Response.data.results
      this.totalHeros = Response.data.total
    }, err => {
      console.log(err);
    })
  }

  pageChanged(event: any) {        
    let offset = String(event.page - 1);
    offset === '0' ? offset = '0' : offset = offset + '0'; // tratativa caso a pagina selecionada seja a primeira 
    return this.getHeros(offset);
  }

  search() {

    if (this.name) {
      return this.heroService.getHeroesByName(this.name).subscribe((Response: Resp) => {
        this.heros = Response.data.results
        this.totalHeros = Response.data.total
      }, err => {
        console.log(err);
      })
    };

    if (this.nameStartsWith) {
      return this.heroService.getHeroesByNameStartsWith(this.nameStartsWith).subscribe((Response: Resp) => {
        this.heros = Response.data.results
        this.totalHeros = Response.data.total
      }, err => {
        console.log(err);
      })
    };

    return this.getHeros();

  }

}
