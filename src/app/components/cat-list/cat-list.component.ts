import { Component, OnInit } from '@angular/core';
import { Cat, CatsService } from 'src/app/services/cats.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent implements OnInit {

  // TODO: сделать элемент списка компонентом

  cats$ = this.catService.getCats();

  constructor(
    private catService: CatsService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  likeCat(id: string) {
    // хранится только в сервисе
  }

}
