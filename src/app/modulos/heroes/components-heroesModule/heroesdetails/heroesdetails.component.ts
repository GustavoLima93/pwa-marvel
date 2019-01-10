import { Resp } from 'src/app/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { HeroesService } from 'src/app/services';
import { Heroes } from './../../../../models/heroes.model';

@Component({
  selector: 'app-heroesdetails',
  templateUrl: './heroesdetails.component.html',
  styleUrls: ['./heroesdetails.component.scss']
})
export class HeroesdetailsComponent implements OnInit, OnDestroy {

  inscricao:Subscription  
  hero:Heroes

  constructor(
    private route: ActivatedRoute,
    private herosService: HeroesService
  ) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(params =>{
      let id = params['id'];

      this.herosService.getHeroById(id).subscribe((resp:Resp)=>{
        this.hero = resp.data.results[0]
        
      })
    })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
