import { Component } from '@angular/core';
import { CatsService } from 'src/app/services/cats.service';

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
    this.catService.likeCat(catId).subscribe();
  }
}
