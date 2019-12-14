import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap, tap, } from 'rxjs/operators';
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
    this.catsSubj$.next(
      this.catsSubj$.getValue()
        .filter(cat => cat._id !== catId),
    );
  }

  saveCat(savedCat: Cat, catId: string) {
    savedCat._id = catId ? catId : String(Math.random());
    savedCat.like = 0;
    this.catsSubj$.next(
      [...this.catsSubj$.getValue().filter(cat => cat._id !== savedCat._id), savedCat]
    );
  }

  likeCat(catId: string) {
    return this.getCat(catId).pipe(
      tap(cat => cat.like++)
    );
  }
}
