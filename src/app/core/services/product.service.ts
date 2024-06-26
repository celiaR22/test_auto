import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DetailProduct {
  description: string;
  color: string;
  price: number;
}

export interface Product {
  id: number;
  creationDate: Date;
  productName: string;
  stock: number;
  detailProduct: DetailProduct;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  static apiUrl = 'http://localhost:3502/';  
  //  private apiUrl = 'http://0.0.0.0:3502/'; // URL API pour test Cypress

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(ProductService.apiUrl + 'product/');
  }

  getProduct(id: number): Observable<Product> {
    const url = `${ProductService.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(ProductService.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${ProductService.apiUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${ProductService.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
