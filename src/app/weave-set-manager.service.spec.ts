import { TestBed } from '@angular/core/testing';

import { WeaveSetManagerService } from './weave-set-manager.service';

describe('WeaveSetManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeaveSetManagerService = TestBed.get(WeaveSetManagerService);
    expect(service).toBeTruthy();
  });
});
