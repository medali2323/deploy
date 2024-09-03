import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVenteProdsComponent } from './add-vente-prods.component';

describe('AddVenteProdsComponent', () => {
  let component: AddVenteProdsComponent;
  let fixture: ComponentFixture<AddVenteProdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVenteProdsComponent]
    });
    fixture = TestBed.createComponent(AddVenteProdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
