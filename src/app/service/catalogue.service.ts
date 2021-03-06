import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  public host: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getRessources(url: string) {
    return this.http.get(this.host + url);
  }
  public getProduct(url: string): Observable<Product> {
    return this.http.get<Product>(url);
  }
  public uploadPhoto(file: File, idProduct: number): Observable<HttpEvent<{}>> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest(
      'POST',
      this.host + '/uploadPhoto/' + idProduct,
      formData,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );
    return this.http.request(request);
  }

  updateProduct(url: string, currentProduct: Product): Observable<Product> {
    return this.http.patch<Product>(this.host + url, currentProduct);
  }
}
