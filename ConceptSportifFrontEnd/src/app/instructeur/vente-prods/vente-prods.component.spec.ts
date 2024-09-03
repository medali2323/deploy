import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteProdsComponent } from './vente-prods.component';

describe('VenteProdsComponent', () => {
  let component: VenteProdsComponent;
  let fixture: ComponentFixture<VenteProdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenteProdsComponent]
    });
    fixture = TestBed.createComponent(VenteProdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
