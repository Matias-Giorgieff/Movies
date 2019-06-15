import { TestBed } from '@angular/core/testing';

import { FavoritosService } from './favoritos.service';

describe('FavoritosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoritosService = TestBed.get(FavoritosService);
    expect(service).toBeTruthy();
  });
});
