// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  
import { HttpClientModule } from '@angular/common/http' 
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { routes } from './app.routes';             



@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    
    BrowserModule,
    CommonModule,//this is used ngIf or ngFor 
    ReactiveFormsModule,//for formmodule
    RouterModule.forRoot(routes),
    HttpClientModule, // setting http module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
