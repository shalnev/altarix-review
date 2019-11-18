import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, first, map, switchMap, tap, } from 'rxjs/operators';
import { BehaviorSubject, from, of } from 'rxjs';

export interface Cat {
  _id: string;
  name: string;
  like: number;
  img: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CatsService {

  private catsSubj$ = new BehaviorSubject<Cat[]>(null);
  private cats$ = this.catsSubj$.asObservable();

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCat(catId: string) {
    return catId === 'new' ?
      of({} as Cat) :
      this.getCats().pipe(
        switchMap((arrCat) => from(arrCat)),
        filter(cat => cat._id === catId),
        map((cat: Cat) => cat),
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

  deleteCat(catId: string) {
    return this.getCats().pipe(
      first(),
      map(cats => cats.filter(cat => cat._id !== catId)),
      tap(cats => this.catsSubj$.next(cats)),
    );
  }

  saveCat(savedCat: Cat, catId: string) {
    return this.getCats().pipe(
      first(),
      map(cats => {
         if (catId) {
           const indexSavedCat = cats.indexOf(cats.find(cat => cat._id === catId));
           cats[indexSavedCat] = {...savedCat, _id: catId, like: 0};
           return cats;
         } else {
           return [...cats, { ...savedCat, _id: String(Math.random()), like: 0 }];
         }
      }),
      tap(cats => this.catsSubj$.next(cats)),
    );
  }

  likeCat(catId: string) {
    return this.getCat(catId).pipe(
      tap(cat => cat.like++)
    );
  }
}
