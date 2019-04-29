import { TestBed } from '@angular/core/testing';

import { MyAhyushHraService } from './my-ahyush-hra.service';

describe('MyAhyushHraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyAhyushHraService = TestBed.get(MyAhyushHraService);
    expect(service).toBeTruthy();
  });
});
