import { Component, OnInit } from '@angular/core';
import { Cat, CatsService } from 'src/app/services/cats.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent {

  cats$ = this.catService.getCats();

  constructor(
    private catService: CatsService,
  ) { }

  handleLikeCat(catId: string) {
    this.catService.likeCat(catId);
  }
}
