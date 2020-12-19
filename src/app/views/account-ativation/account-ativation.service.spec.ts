import { TestBed } from '@angular/core/testing';

import { AccountAtivationService } from './account-ativation.service';

describe('AccountAtivationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountAtivationService = TestBed.get(AccountAtivationService);
    expect(service).toBeTruthy();
  });
});
