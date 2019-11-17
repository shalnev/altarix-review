import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, pluck, switchMap, tap, toArray } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';

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

  private catsSubj$ = new BehaviorSubject<Cat[]>(null);
  private cats$ = this.catsSubj$.asObservable();

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCat(id: string) {
    return this.getCats().pipe(
      switchMap((arrCat) => from(arrCat)),
      filter(cat => cat._id === id),
      toArray(),
      pluck<Cat[], Cat>('0'),
      );
  }

  getCats() {
    return this.catsSubj$.getValue() ?
      this.cats$ :
      this.loadCats().pipe(
        tap(cats => this.catsSubj$.next(cats)),
        switchMap(() => this.cats$),
      );
  }

  private loadCats() {
    return this.httpClient.get<Cat[]>('/assets/cats.json');
  }

  deleteCat(catId: string) {}

  saveCat(cat: Cat) {
  }

  likeCat(catId: string) {
  }
}
