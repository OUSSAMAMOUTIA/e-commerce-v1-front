import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../../service/catalogue.service';
import { Product } from '../../model/product.model';
import { AuthService } from '../../service/auth.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  currentProduct!: Product;
  public timestamp = 0;
  public editPhoto!: boolean;
  public selectedFiles: any;
  public progress!: number;
  public currentFileUpload: any;
  public formGroup: FormGroup = this.fb.group({
    quantity: 1,
  });
  public mode: number = 0;

  constructor(
    private router: Router,
    private activtedRoute: ActivatedRoute,
    public catalogueService: CatalogueService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const url = atob(this.activtedRoute.snapshot.params['url']);
    this.catalogueService.getProduct(url).subscribe((data) => {
      this.currentProduct = data;
    });
  }

  getTs() {
    return this.timestamp;
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  onEditPhoto(currentProduct: Product) {
    this.currentProduct = currentProduct;
    this.editPhoto = true;
  }

  onSelectedFile($event: Event) {
    // @ts-ignore
    this.selectedFiles = $event.target.files;
  }

  upload() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catalogueService
      .uploadPhoto(this.currentFileUpload, this.currentProduct.id)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            // @ts-ignore
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            console.log('File uploaded!');
            // this.getProducts("products/search/selectedproduct");
            this.timestamp = Date.now();
          }
        },
        (error) => {
          alert('error' + JSON.parse(error.error).message);
        }
      );
  }

  onAddProductToPanier(currentProduct: Product) {}

  onUpdateProduct() {
    const url = this.currentProduct._links.self.href;
    this.catalogueService.updateProduct(url, this.currentProduct).subscribe(
      (data) => {
        this.currentProduct = data;
        this.mode = 0;
      },
      (error) => {
        alert('error' + JSON.parse(error.error).message);
      }
    );
  }
  onEditProduct() {
    this.mode = 1;
  }
}
