import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CatListComponent } from './components/cat-list/cat-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CatCardComponent } from './components/cat-card/cat-card.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app/app-routing.module';
import { CatPreviewComponent } from './components/cat-preview/cat-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CatListComponent,
    CatCardComponent,
    CatPreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
