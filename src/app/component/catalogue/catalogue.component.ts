import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "../../service/catalogue.service";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  public products: any;

  constructor(public catalogueService: CatalogueService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.catalogueService.getRessources("products/search/selectedproduct").subscribe({
      next: (data) => {
        this.products = data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
