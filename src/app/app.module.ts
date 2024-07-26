import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { EmployeesService } from './services/employees.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, SingleEmployeeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    FormsModule,
    MatMenuModule,
  ],
  providers: [EmployeesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
