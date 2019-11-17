import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cat, CatsService } from 'src/app/services/cats.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.css']
})
export class CatCardComponent implements OnInit {
  cat$: Observable<Cat>;
  formGroup: FormGroup;
  imageUrl: string;
  catId: string;
  submitted: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private catsService: CatsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const catId = this.activatedRoute.snapshot.params.id;
    this.cat$ = this.catsService.getCat(catId).pipe(
      tap(cat => {
        this.catId = cat._id;
        if (cat.img) {
          this.imageUrl = cat.img;
        }
        this.formGroup = this.formBuilder.group({
            name: [cat.name, Validators.required],
            img: [cat.img, Validators.required],
            description: [cat.description],
          },
        );
      })
    );
  }

  handleSaveCat() {
    this.submitted = true;
    if (!this.formGroup.valid) {
      alert('Пожалуйста, заполните обязательные поля');
    } else {
      debugger;
      this.catsService.saveCat(this.formGroup.value);
    }
  }

  handleDeleteCat() {
  }

  uploadFile(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.formGroup.patchValue({
          img: reader.result
        });
      };
    }
  }
}
