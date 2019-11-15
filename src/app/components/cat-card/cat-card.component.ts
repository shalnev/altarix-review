import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Cat, CatsService } from 'src/app/services/cats.service';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.css']
})
export class CatCardComponent implements OnInit {

  cat$: Observable<Cat>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private catsService: CatsService,
  ) { }

  ngOnInit() {
    const catId = this.activatedRoute.snapshot.params.id;
    this.cat$ = this.catsService.getCat(catId);
  }

}
