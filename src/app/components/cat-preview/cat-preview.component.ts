import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from 'src/app/services/cats.service';

@Component({
  selector: 'app-cat-preview',
  templateUrl: './cat-preview.component.html',
  styleUrls: ['./cat-preview.component.css']
})
export class CatPreviewComponent {

  @Input() cat: Cat;
  @Output() likeCat = new EventEmitter<string>();

  constructor() { }

  handleLikeCat(event: Event, catId: string) {
    event.stopPropagation();
    this.likeCat.emit(catId);
  }
}
