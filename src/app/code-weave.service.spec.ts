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

  it('SwapOrder shall return an array with the same length', inject(
    [CodeWeaveService],
    (service: CodeWeaveService) => {
      const weaveValues = ['something here', 'here', 'else'];
      const result = service.SwapOrder(weaveValues);
      expect(result.length).toEqual(weaveValues.length);
    }
  ));

  it('SwapOrder shall return an array with the start now being the end', inject(
    [CodeWeaveService],
    (service: CodeWeaveService) => {
      const weaveValues = ['something here', 'here', 'else'];
      const result = service.SwapOrder(weaveValues);
      expect(result[result.length - 1]).toEqual(weaveValues[0]);
    }
  ));
});
