import { Heroes } from './heroes.model';

export interface Data {

    offset: number,
    limit: number,
    total: number
    count: number,
    results: any[]
}
