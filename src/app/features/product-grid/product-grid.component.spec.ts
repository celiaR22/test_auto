import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { ProductGridComponent } from './product-grid.component';
import { ProductService } from 'src/app/core/services/product.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';


class MockProductService {
  getAllProducts() {
    return of([
      {id: 1, creationDate: new Date('2023-06-01'), productName: 'Produit 1', stock: 10, detailProduct: {description: 'Description 1', color: 'Rouge', price: 100}},
      {id: 2, creationDate: new Date('2023-06-02'), productName: 'Produit 2', stock: 5, detailProduct: {description: 'Description 2', color: 'Bleu', price: 150}},
    ]);
  }
}

describe('ProductGridComponent', () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;
  let productService: ProductService;
  let el: DebugElement;
  let datePipe: DatePipe;
  let currencyPipe: CurrencyPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductGridComponent],
      imports: [
        MatTableModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        DatePipe,
        CurrencyPipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    datePipe = TestBed.inject(DatePipe);
    currencyPipe = TestBed.inject(CurrencyPipe);
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct columns displayed', () => {
    expect(component.displayedColumns).toEqual(['id', 'creationDate', 'productName', 'stock', 'description', 'color', 'price']);
  });

  it('should load products from the ProductService', () => {
    spyOn(productService, 'getAllProducts').and.callThrough();
    fixture.detectChanges();
    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should display the correct product data in the table', () => {
    fixture.detectChanges();
    const rows = el.queryAll(By.css('tr.mat-row'));
    expect(rows.length).toBe(2);

    const firstRowCells = rows[0].queryAll(By.css('td.mat-cell'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('1');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe(datePipe.transform(new Date('2023-06-01'), 'dd/MM/yyyy'));
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('Produit 1');
    expect(firstRowCells[3].nativeElement.textContent.trim()).toBe('10');
    expect(firstRowCells[4].nativeElement.textContent.trim()).toBe('Description 1');
    expect(firstRowCells[5].nativeElement.textContent.trim()).toBe('Rouge');
    expect(firstRowCells[6].nativeElement.textContent.trim()).toBe(currencyPipe.transform(100, 'EUR', 'symbol', '1.2-2'));
  });

  it('should display the correct date format', () => {
    fixture.detectChanges();
    const cell = el.query(By.css('td.mat-cell:nth-child(2)'));
    expect(cell.nativeElement.textContent.trim()).toBe(datePipe.transform(new Date('2023-06-01'), 'dd/MM/yyyy'));
  });

  it('should format the price correctly', () => {
    fixture.detectChanges();
    const cell = el.query(By.css('td.mat-cell:nth-child(7)'));
    expect(cell.nativeElement.textContent.trim()).toBe(currencyPipe.transform(100, 'EUR', 'symbol', '1.2-2'));
  });
});
