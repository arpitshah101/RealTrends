import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  // redirect to discovery page by default for now...
  {
    path: '',
    // redirectTo: 'discovery',
    pathMatch: 'full',
    component: AppComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: `reload`})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
