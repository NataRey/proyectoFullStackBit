import { TestBed } from '@angular/core/testing';

import { ProductosS } from './productos-s';

describe('ProductosS', () => {
  let service: ProductosS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
