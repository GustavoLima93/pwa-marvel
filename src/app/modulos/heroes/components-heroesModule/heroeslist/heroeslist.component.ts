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
export class HeroeslistComponent implements OnInit, DoCheck {

  public heros: Heroes[];
  public totalHeros: number;
  public showBoundaryLinks = true;
  public notConflict = false;
  public name: string;
  public nameStartsWith: string;
  public currentPage:number;
  public spin = false;

  constructor(
    private heroService: HeroesService,

  ) {
  }

  ngOnInit() {
    this.spin = true
    this.getHeros();
    this.getCurrentPage();
  }

  ngDoCheck() {
    this.name && this.nameStartsWith ? this.notConflict = true :  this.notConflict = false;
  }

  getCurrentPage() {
    return this.currentPage = Number(this.heroService.getOffSet())/10+1;
  }

  getHeros(offset?: string) {
    console.log("entrou aqui !!")
    let page = ''
    offset ? page = offset : page = '' // trataiva para offset

    this.heroService.getHeroes(page).subscribe((Response: Resp) => {
      this.heros = Response.data.results
      this.totalHeros = Response.data.total
      this.spin = false
    }, err => {
      console.log(err);
      this.spin = false;
    })
  }

  pageChanged(event: any) {
    let offset = String(event.page - 1);
    offset === '0' ? offset = '0' : offset = offset + '0'; // tratativa caso a pagina selecionada seja a primeira
   // window.scrollTo(0, 0);
    return this.getHeros(offset);
  }

  search() {
    this.spin = true
    if (this.name) {
      return this.heroService.getHeroesByName(this.name).subscribe((Response: Resp) => {
        this.heros = Response.data.results
        this.totalHeros = Response.data.total
      }, err => {
        console.log(err);
      },()=>{
        this.spin = false
      })
    };

    if (this.nameStartsWith) {
      return this.heroService.getHeroesByNameStartsWith(this.nameStartsWith).subscribe((Response: Resp) => {
        this.heros = Response.data.results
        this.totalHeros = Response.data.total
      }, err => {
        console.log(err);
      },()=>{
        this.spin = false
      })
    };

    return this.getHeros();

  }

}
