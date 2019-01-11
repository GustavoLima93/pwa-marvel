import { Subscription } from 'rxjs';
import { Component, OnInit, DoCheck, ViewEncapsulation, OnDestroy } from '@angular/core';

import { SeriesService } from 'src/app/services';
import { Resp } from 'src/app/models';
import { Serie } from 'src/app/models/serie.model';

@Component({
  selector: 'app-serieslist',
  templateUrl: './serieslist.component.html',
  styleUrls: ['./serieslist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SerieslistComponent implements OnInit, DoCheck, OnDestroy {

  public spin = false;
  public series: Serie[];
  public totalSeries: number;
  public showBoundaryLinks = true;
  public notConflict = false;
  public title: string;
  public titleStartsWith: string;
  public currentPage: number;

  private inscricaoGetSerie: Subscription;
  private inscricaoGetSeriesByTitle: Subscription;
  private inscricoesGetSeriesByTitleStartsWith: Subscription;


  constructor(
    private seriesService: SeriesService
  ) { }

  ngOnInit() {
    this.spin = true;
    this.getSeries();
    this.getCurrentPage();
  }

  ngDoCheck() {
    this.title && this.titleStartsWith ? this.notConflict = true : this.notConflict = false;
  }

  getCurrentPage() {
    return this.currentPage = Number(this.seriesService.getOffSet()) / 10 + 1;
  }

  getSeries(offset?: string) {

    let page = ''
    offset ? page = offset : page = '' // trataiva para offset
    this.inscricaoGetSerie = this.seriesService.getSeries(page).subscribe((Response: Resp) => {
      this.series = Response.data.results
      this.totalSeries = Response.data.total
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
    return this.getSeries(offset);
  }


  search() {
    this.spin = true
    if (this.title) {
      return this.inscricaoGetSeriesByTitle = this.seriesService.getSeriesByTitle(this.title).subscribe((Response: Resp) => {
        this.series = Response.data.results
        this.totalSeries = Response.data.total
        this.spin = false
      }, err => {
        console.log(err);
        this.spin = false
      }, () => {
        this.spin = false
      })
    };

    if (this.titleStartsWith) {
      return this.seriesService.getSeriesByTitleStartsWith(this.titleStartsWith).subscribe((Response: Resp) => {
        this.series = Response.data.results
        this.totalSeries = Response.data.total
        this.spin = false
      }, err => {
        console.log(err);
        this.spin = false
      }, () => {
        this.spin = false
      })
    };

    return this.getSeries();

  }

  scrollTop() {
    window.scrollTo(0, 0);
  }


  ngOnDestroy() {
    this.inscricaoGetSerie.unsubscribe();
    
    if (this.inscricaoGetSeriesByTitle) {
      this.inscricaoGetSeriesByTitle.unsubscribe();
    }

    if (this.inscricoesGetSeriesByTitleStartsWith) {
      this.inscricoesGetSeriesByTitleStartsWith.unsubscribe();
    }
  }

}
