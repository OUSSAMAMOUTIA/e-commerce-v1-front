import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./service/catalogue.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public categories: any;
  public currentCategory: any;
  constructor(private catalogueService: CatalogueService,private router:Router) {
  }

  ngOnInit(): void {
    this.getCatetgories();
  }

  public getCatetgories() {
    this.catalogueService.getRessources("categories").subscribe({
      next: (data) => {
        this.categories = data;
        console.log("heeloooo")
        console.log(this.categories);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getProductsByCat(c: object) {
    this.currentCategory = c;
      // @ts-ignore
    this.router.navigateByUrl("products/2/" + c.id);
  }

  onSelectedProduct() {
    this.currentCategory = null;
    this.router.navigateByUrl("products/1/0");
  }

  onProductsPromo() {
    this.currentCategory = null;
    // @ts-ignore
    this.router.navigateByUrl("products/3/0" );
  }

  onProductsDispo() {
    this.currentCategory = null;
    // @ts-ignore
    this.router.navigateByUrl("products/4/0" );
  }
}
