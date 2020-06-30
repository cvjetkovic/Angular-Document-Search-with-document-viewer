import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleLawComponent } from './single-law/single-law.component';


const routes: Routes = [
  { path: 'law/:uuid', component: SingleLawComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
