import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})


export class ProductGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'creationDate', 'productName', 'stock', 'description', 'color', 'price'];
  dataSource = new MatTableDataSource();
  constructor(private productService: ProductService) { }

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

