import { Component, OnInit, ViewEncapsulation, DoCheck, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { Resp, Heroes } from 'src/app/models';

import { Subscription } from 'rxjs';

import { HeroesService } from './../../../../services/heroes.service';

@Component({
  selector: 'list-heroeslist',
  templateUrl: './heroeslist.component.html',
  styleUrls: ['./heroeslist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeroeslistComponent implements OnInit, DoCheck, OnDestroy {

  public heros: Heroes[];
  public totalHeros: number;
  public showBoundaryLinks = true;
  public notConflict = false;
  public name: string;
  public nameStartsWith: string;
  public currentPage: number;
  public spin = false;

  private inscricaoGetHeroes: Subscription;
  private inscricaoGetHeroesByName: Subscription;
  private inscricoesGetHeroesByNameStartsWith: Subscription;

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
    this.name && this.nameStartsWith ? this.notConflict = true : this.notConflict = false;
  }

  getCurrentPage() {
    return this.currentPage = Number(this.heroService.getOffSet()) / 10 + 1;
  }

  getHeros(offset?: string) {

    let page = ''
    offset ? page = offset : page = '' // trataiva para offset

    this.inscricaoGetHeroes = this.heroService.getHeroes(page).subscribe((Response: Resp) => {
      this.heros = Response.data.results
      this.totalHeros = Response.data.total
      this.spin = false;
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
      return this.inscricaoGetHeroesByName = this.heroService.getHeroesByName(this.name).subscribe((Response: Resp) => {
        this.heros = Response.data.results
        this.totalHeros = Response.data.total
        this.spin = false
      }, err => {
        console.log(err);
        this.spin = false
      }, () => {
        this.spin = false
      })
    };

    if (this.nameStartsWith) {
      return this.inscricoesGetHeroesByNameStartsWith = this.heroService.getHeroesByNameStartsWith(this.nameStartsWith).subscribe((Response: Resp) => {
        this.heros = Response.data.results
        this.totalHeros = Response.data.total
        this.spin = false
      }, err => {
        console.log(err);
        this.spin = false
      }, () => {
        this.spin = false
      })
    };

    return this.getHeros();

  }

  scrollTop() {
    window.scrollTo(0, 0);
  }


  ngOnDestroy() {

    this.inscricaoGetHeroes.unsubscribe();

    if(this.inscricaoGetHeroesByName){
      this.inscricaoGetHeroesByName.unsubscribe();
    }

    if(this.inscricoesGetHeroesByNameStartsWith){
      this.inscricoesGetHeroesByNameStartsWith.unsubscribe();
    }


  }

}
