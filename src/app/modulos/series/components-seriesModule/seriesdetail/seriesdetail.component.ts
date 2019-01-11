import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from 'src/app/services';
import { Subscription } from 'rxjs';
import { Resp, Serie } from 'src/app/models';

@Component({
  selector: 'app-seriesdetail',
  templateUrl: './seriesdetail.component.html',
  styleUrls: ['./seriesdetail.component.scss']
})
export class SeriesdetailComponent implements OnInit, OnDestroy {

  private inscricao:Subscription  
  public serie:Serie
  public isCollapsedHeroes = true;
  public isCollapsedStories = true;
  public isCollapsedComics = true;
  public isCollapsedCreators = true;
  public spin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seriesService: SeriesService
  ) { }

  ngOnInit() {
    this.spin = true;
    this.inscricao = this.route.params.subscribe(params =>{
      let id = params['id'];

      this.seriesService.getSerieById(id).subscribe((resp:Resp)=>{
        this.serie = resp.data.results[0]
        this.spin = false
      },err => {
        console.log(err)
        this.spin = false
      },()=>{
        this.spin = false
      })
    })
  }

  gotoHeroes(path:string) {
    let split = path.split('/');
    let id = split[split.length-1];
    this.router.navigate(['/heroes',id]);
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }


}
