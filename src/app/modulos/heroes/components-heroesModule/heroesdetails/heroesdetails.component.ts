import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroesService } from 'src/app/services';
import { Resp, Heroes } from 'src/app/models';

@Component({
  selector: 'app-heroesdetails',
  templateUrl: './heroesdetails.component.html',
  styleUrls: ['./heroesdetails.component.scss']
})
export class HeroesdetailsComponent implements OnInit, OnDestroy {

  private inscricao:Subscription;
  public isCollapsedHeroes = true;
  public hero:Heroes;
  public spin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private herosService: HeroesService
  ) { }

  ngOnInit() {
    this.spin = true;
    this.inscricao = this.route.params.subscribe(params =>{
      let id = params['id'];

      this.herosService.getHeroById(id).subscribe((resp:Resp)=>{
        this.hero = resp.data.results[0]
        this.spin = false
      },err => {
        console.log(err)
        this.spin = false
      },()=>{
        this.spin = false
      })
    })
  }

  gotoSeries(path:string) {
    let split = path.split('/');
    let id = split[split.length-1];
    this.router.navigate(['/series',id]);
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
