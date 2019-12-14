import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cat, CatsService } from 'src/app/services/cats.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

const FORM_CONFIG = [
  {
    name: 'name',
    validators: [Validators.required],
  },
  {
    name: 'img',
    validators: [Validators.required],
  },
  {
    name: 'description',
    validators: [],
  },
];

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.css'],
})
export class CatCardComponent implements OnInit {
  cat$: Observable<Cat>;
  formGroup = this.formBuilder.group({});
  imageUrl: string;
  catId: string;
  submitted: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private catsService: CatsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const catId = this.activatedRoute.snapshot.params.id;
    this.cat$ = this.catsService.getCat(catId).pipe(
      tap(cat => {
        if (cat._id) {
          this.catId = cat._id;
          this.imageUrl = cat.img;
        }
      }),
      tap((cat) => {
        FORM_CONFIG.forEach(configElement =>
          this.formGroup.addControl(configElement.name, new FormControl(cat[configElement.name], configElement.validators)));
      })
    );
  }

  async handleSaveCat() {
    this.submitted = true;
    if (!this.formGroup.valid) {
      alert('Пожалуйста, заполните обязательные поля');
    } else {
      this.catsService.saveCat(this.formGroup.value, this.catId);
      await this.router.navigateByUrl('');
    }
  }

  async handleDeleteCat() {
    this.catsService.deleteCat(this.catId);
    await this.router.navigateByUrl('');
  }

  uploadFile(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.formGroup.patchValue({
          img: reader.result,
        });
      };
    }
  }
}
