import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private urlSeries = `${environment.url}/series`;
  private offSet = '0' ;

  private hash = 'ebd407c102ea3f1262b8dd370cfa04d4a132a867d8b23f3429d72898aaffd1a321761b4a';
  private key = 'd8b23f3429d72898aaffd1a321761b4a';

  constructor(
    private http: HttpClient
  ) { }

  getSeries(offset?:string): Observable<any> {
    offset ? this.setOffset(offset) : false

    /**
     * params  para get da api de acordo com documentacao
     */
    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + this.hash));

    return this.http.get<any>(this.urlSeries,{
      params: new HttpParams()
      .set('ts', ts)
      .set('orderBy', 'title')
      .set('offset', this.offSet)
      .set('limit', '10')
      .set('apikey', this.key)
      .set('hash', hash)}
    )
  }

  getSeriesByTitle(title:string): Observable<any> {

    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + this.hash));

    return this.http.get<any>(this.urlSeries,{
      params: new HttpParams()
      .set('ts', ts)
      .set('title', title)
      .set('apikey', this.key)
      .set('hash', hash)}
    )
  }

  getSeriesByTitleStartsWith(titleStartsWith:string): Observable<any> {

    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + this.hash));

    return this.http.get<any>(this.urlSeries,{
      params: new HttpParams()
      .set('ts', ts)
      .set('titleStartsWith', titleStartsWith)
      .set('apikey', this.key)
      .set('hash', hash)}
    )
  }

  getSerieById(id:string): Observable<any> {

    let timestamp = Number(new Date());
    let ts = String(timestamp); // httpParams aceita apenas string , fazendo cast para string
    let hash = String(Md5.hashStr(timestamp + this.hash));

    return this.http.get<any>(`${this.urlSeries}/${id}`,{
      params: new HttpParams()
      .set('ts', ts)
      .set('apikey', this.key)
      .set('hash', hash)}
    )
  }

  /**
   * funcao set/get offset para auxiliar no retorno de pagina do SeriesDetail
   */

  setOffset(offset:string) {
    return this.offSet = offset;
   }

   getOffSet() {
     return this.offSet;
   }
}
