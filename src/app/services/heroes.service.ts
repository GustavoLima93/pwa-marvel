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

  private urlHeros = `${environment.url}/characters`;
  private offSet = '0' ;

  private hash = 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a';
  private key = 'd8b23f3429d72898aaffd1a321761b4a';

// 9e6cf79c09f39ef1f50f7bd3f96c15363688a9aa0d3a86b52bb2c90c962cd2438a96e527
// 0d3a86b52bb2c90c962cd2438a96e527

//'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a';
//'d8b23f3429d72898aaffd1a321761b4a';

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
    let hash = String(Md5.hashStr(timestamp + this.hash));

    return this.http.get<Resp>(this.urlHeros,{
      params: new HttpParams()
      .set('ts', ts)
      .set('orderBy', 'name')
      .set('offset', this.offSet)
      .set('limit', '10')
      .set('apikey', this.key)
      .set('hash', hash)}
    )
  }

  getHeroesByName(name:string): Observable<Resp> {

    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + this.hash));

    return this.http.get<Resp>(this.urlHeros,{
      params: new HttpParams()
      .set('ts', ts)
      .set('name', name)
      .set('apikey', this.key)
      .set('hash', hash)}
    )
  }

  getHeroesByNameStartsWith(NameStartsWith:string): Observable<Resp> {

    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + this.hash));

    return this.http.get<Resp>(this.urlHeros,{
      params: new HttpParams()
      .set('ts', ts)
      .set('nameStartsWith', NameStartsWith)
      .set('apikey', this.key)
      .set('hash', hash)}
    )
  }

  getHeroById(id:string): Observable<Resp> {

    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + this.hash));

    return this.http.get<Resp>(`${this.urlHeros}/${id}`,{
      params: new HttpParams()
      .set('ts', ts)
      .set('apikey', this.key)
      .set('hash', hash)}
    )
  }

  /**
   * funcao set/get offset para auxiliar no retorno de pagina do heroDetail
   */

   setOffset(offset:string) {
    return this.offSet = offset;
   }

   getOffSet() {
     return this.offSet;
   }





}
