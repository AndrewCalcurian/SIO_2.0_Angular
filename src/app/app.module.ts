import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarModule } from './shared/navbar/navbar.module';
import { ComprasModule } from './compras/compras.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    NavbarModule,
    ComprasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
