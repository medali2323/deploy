import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVenteAbosComponent } from './add-vente-abos.component';

describe('AddVenteAbosComponent', () => {
  let component: AddVenteAbosComponent;
  let fixture: ComponentFixture<AddVenteAbosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVenteAbosComponent]
    });
    fixture = TestBed.createComponent(AddVenteAbosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
