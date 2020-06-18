import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component'

const routes: Routes = [
  {path: 'inscription', component: InscriptionFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
