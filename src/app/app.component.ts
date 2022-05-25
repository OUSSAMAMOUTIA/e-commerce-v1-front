import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./service/catalogue.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public categories: any;

  constructor(private catalogueService: CatalogueService) {
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
}
