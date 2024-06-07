import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Product, DetailProduct } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllProducts', () => {
    it('devrait retourner un Observable<Product[]>', () => {
      const dummyProducts: Product[] = [
        {
          id: 1,
          creationDate: new Date(),
          productName: 'Produit factice',
          stock: 10,
          detailProduct: {
            description: 'Description factice',
            color: 'Rouge',
            price: 20
          }
        },
      ];

      service.getAllProducts().subscribe(products => {
        expect(products.length).toBe(dummyProducts.length);
        expect(products).toEqual(dummyProducts);
      });

      const req = httpMock.expectOne(`${ProductService.apiUrl}product/`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProducts);
    });
  });

  describe('getProduct', () => {
    it('devrait retourner un Observable<Product>', () => {
      const dummyProduct: Product = {
        id: 1,
        creationDate: new Date(),
        productName: 'Produit factice',
        stock: 10,
        detailProduct: {
          description: 'Description factice',
          color: 'Rouge',
          price: 20
        }
      };

      service.getProduct(1).subscribe(product => {
        expect(product).toEqual(dummyProduct);
      });

      const req = httpMock.expectOne(`${ProductService.apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProduct);
    });
  });

  describe('addProduct', () => {
    it('devrait ajouter un nouveau produit', () => {
      const dummyProduct: Product = {
        id: 1,
        creationDate: new Date(),
        productName: 'Produit factice',
        stock: 10,
        detailProduct: {
          description: 'Description factice',
          color: 'Rouge',
          price: 20
        }
      };

      service.addProduct(dummyProduct).subscribe(product => {
        expect(product).toEqual(dummyProduct);
      });

      const req = httpMock.expectOne(ProductService.apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(dummyProduct);
    });
  });

  describe('updateProduct', () => {
    it('devrait mettre à jour un produit existant', () => {
      const dummyProduct: Product = {
        id: 1,
        creationDate: new Date(),
        productName: 'Produit factice mis à jour',
        stock: 20,
        detailProduct: {
          description: 'Description factice mise à jour',
          color: 'Bleu',
          price: 30
        }
      };

      service.updateProduct(dummyProduct).subscribe(product => {
        expect(product).toEqual(dummyProduct);
      });

      const req = httpMock.expectOne(`${ProductService.apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyProduct);
    });
  });

  describe('deleteProduct', () => {
    it('devrait supprimer le produit avec l\'identifiant donné', () => {
      const productId = 1;

      service.deleteProduct(productId).subscribe(() => {
        expect().nothing();
      });

      const req = httpMock.expectOne(`${ProductService.apiUrl}/${productId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
