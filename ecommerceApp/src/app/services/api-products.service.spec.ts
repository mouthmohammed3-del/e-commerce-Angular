import { TestBed } from '@angular/core/testing';

import { APiProductsService } from './api-products.service';

describe('APiProductsService', () => {
  let service: APiProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APiProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
