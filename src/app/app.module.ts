import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { CatalogueComponent } from './component/catalogue/catalogue.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductDetailsComponent } from './component/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    LoginComponent,
    ProductDetailsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
      ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
