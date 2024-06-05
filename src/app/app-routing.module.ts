import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignInComponent } from './features/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' } // Route par défaut vers SignIn
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
