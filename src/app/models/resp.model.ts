import { Data } from './data.model';

export interface Resp {

     code: number,
     status: string,
     copyright: string,
     attributionText: string,
     attributionHTML: string,
     etag: string,
     data: Data
         
   }
   