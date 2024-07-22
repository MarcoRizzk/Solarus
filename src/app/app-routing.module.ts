import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employee/:id', component: SingleEmployeeComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
