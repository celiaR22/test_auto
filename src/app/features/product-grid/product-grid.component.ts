import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})


export class ProductGridComponent implements OnInit {
  PRODUCT_DATA: Product[] = [
    // Exemple de données
    {id: 1, creationDate: new Date(), productName: 'Produit 1', stock: 10, detailProduct: {description: 'Description 1', color: 'Rouge', price: 100}},
    {id: 2, creationDate: new Date(), productName: 'Produit 2', stock: 5, detailProduct: {description: 'Description 2', color: 'Bleu', price: 150}},
  ];
  displayedColumns: string[] = ['id', 'creationDate', 'productName', 'stock', 'description', 'color', 'price'];
  dataSource = new MatTableDataSource();
  constructor( private productService :ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.dataSource.data = products;
    });
  }

}
export interface Product {
  id: number;
  creationDate: Date;
  productName: string;
  stock: number;
  detailProduct: {
    description: string;
    color: string;
    price: number;
  };
}

