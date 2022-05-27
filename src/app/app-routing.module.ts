import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogueComponent} from "./component/catalogue/catalogue.component";
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [
  {path: 'products/:param1/:param2', component: CatalogueComponent},
  {path: '', redirectTo: "products/1/0", pathMatch: "full"},
  {path: 'login', component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
