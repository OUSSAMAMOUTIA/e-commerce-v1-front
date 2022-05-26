import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogueComponent} from "./component/catalogue/catalogue.component";

const routes: Routes = [
  {path: 'products/:param1/:param2', component: CatalogueComponent},
  {path: '', redirectTo: "products/1/0", pathMatch: "full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
