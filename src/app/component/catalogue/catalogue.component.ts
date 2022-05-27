import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "../../service/catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  public products: any;
  public editPhoto!: boolean;
  public crrentProduct: any;
  public selectedFiles: any;
  public progress!: number;
  public currentFileUpload: any;
  public title!:string;
  public timestamp=0;
  public formGroup:FormGroup = this.fb.group({
    quantity:1,
  })
  constructor(public catalogueService: CatalogueService, public route: ActivatedRoute, public router: Router,public authService:AuthService,private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd
      ) {
        let url = val.url;
        const param1 = this.route.snapshot.params['param1'];
        if (param1 == 1) {
          this.title = "Produits selectionnés";
          this.getProducts("products/search/selectedproduct");
        } else if (param1 == 2) {

          const idCategorie = this.route.snapshot.params['param2'];
          this.title = "Produits de la catégorie " + idCategorie;
          this.getProducts("categories/" + idCategorie + "/products");
        } else if (param1 == 3) {
          this.title = "Produits en promo";

          this.getProducts("products/search/promoproduct");
        } else if (param1 == 4) {
          this.title = "Produits Available";
          this.getProducts("products/search/dispoproduct");

        }
        else if (param1 == 5) {
          this.title = "Recherche...";
          this.getProducts("products/search/dispoproduct");

        }
      }
    })
    const param1 = this.route.snapshot.params['param1'];
    if (param1 == 1) {
      this.getProducts("products/search/selectedproduct");
    }
  }

  public getProducts(url: string) {
    this.catalogueService.getRessources(url).subscribe({
      next: (data) => {
        this.products = data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  onEditPhoto(p: any) {
    this.crrentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile($event: Event) {
    // @ts-ignore
    this.selectedFiles = $event.target.files;
  }

  upload() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catalogueService.uploadPhoto(this.currentFileUpload, this.crrentProduct.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File uploaded!');
          // this.getProducts("products/search/selectedproduct");
          this.timestamp=Date.now();
        }
      }, error => {
        alert("error" + JSON.parse(error.error).message);
      }
    )
  }

  getTs() {
     return this.timestamp;
  }

  isAdmin() {
   return  this.authService.isAdmin();
  }
}
