import { TestBed, inject } from '@angular/core/testing';

import { CodeWeaveService } from './code-weave.service';

describe('CodeWeaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeWeaveService]
    });
  });

  it('should be created', inject([CodeWeaveService], (service: CodeWeaveService) => {
    expect(service).toBeTruthy();
  }));

  it('ReplaceAll shall replace all :O', inject([CodeWeaveService], (service: CodeWeaveService) => {
    const result = service.ReplaceAll('something here', 'here', 'else');
    expect(result).toEqual('something else');
  }));
});
