import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatListComponent } from 'src/app/components/cat-list/cat-list.component';
import { CatCardComponent } from 'src/app/components/cat-card/cat-card.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'cats',
    pathMatch: 'full',
  },
  {
    path: 'cats',
    component: CatListComponent,
  },
  {
    path: 'cats/:id',
    component: CatCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
