import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, pluck, switchMap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

export interface Cat {
  _id: string;
  name: string;
  like: number;
  img: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCat(id: string) {
    return this.httpClient.get<Cat[]>('/assets/cats.json').pipe(
      switchMap((arrCat) => from(arrCat)),
      filter(cat => cat._id === id),
      toArray(),
      pluck<Cat[], Cat>('0'),
      );
  }

 // TODO: какоо черта arrow function (AOT??)
  getCats()  {
    return this.httpClient.get<Cat[]>('/assets/cats.json');
  }

  /*deleteCat(id: string): string {}

  createCat(cat: ICat): ICat {}

  updateCat(cat: ICat): ICat {}*/
}
