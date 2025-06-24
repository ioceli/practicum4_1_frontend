import { TestBed } from '@angular/core/testing';

import { GeneralinterceptorService } from './generalinterceptor.service';

describe('GeneralinterceptorService', () => {
  let service: GeneralinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
