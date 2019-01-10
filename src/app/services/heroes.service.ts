import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resp } from '../models';

import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private urlHeros = `${environment.url}/characters`
  private offSet = '0'
  
  

  constructor(
    private http: HttpClient
  ) { }

  getHeroes(offset?:string): Observable<Resp> {     
    offset ? this.setOffset(offset) : false 
    
    /**
     * params  para get da api de acordo com documentacao
     */
    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a'));

    return this.http.get<Resp>(this.urlHeros,{
      params: new HttpParams()
      .set('ts', ts)
      .set('orderBy', 'name')
      .set('offset', this.offSet)
      .set('limit', '10')           
      .set('apikey', 'd8b23f3429d72898aaffd1a321761b4a')
      .set('hash', hash)}
    )
  }

  getHeroesByName(name:string): Observable<Resp> {

    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a'));

    return this.http.get<Resp>(this.urlHeros,{
      params: new HttpParams()
      .set('ts', ts)      
      .set('name', name)                 
      .set('apikey', 'd8b23f3429d72898aaffd1a321761b4a')
      .set('hash', hash)}
    )
  }
  
  getHeroesByNameStartsWith(NameStartsWith:string): Observable<Resp> {

    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a'));

    return this.http.get<Resp>(this.urlHeros,{
      params: new HttpParams()
      .set('ts', ts)      
      .set('nameStartsWith', NameStartsWith)                 
      .set('apikey', 'd8b23f3429d72898aaffd1a321761b4a')
      .set('hash', hash)}
    )
  }

  getHeroById(id:string): Observable<Resp> {

    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a'));

    return this.http.get<Resp>(`${this.urlHeros}/${id}`,{
      params: new HttpParams()
      .set('ts', ts)   
      .set('apikey', 'd8b23f3429d72898aaffd1a321761b4a')
      .set('hash', hash)}
    )
  }

  /**
   * funcao set offset para auxiliar no retorno de pagina do heroDetail 
   */

   setOffset(offset:string) {
    return this.offSet = offset;
   }

   getOffSet() {
     return this.offSet;
   }

   /** funcao que seta  pagina  atual similar a funcao acima  */

 
  

}
