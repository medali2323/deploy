import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteAbosComponent } from './vente-abos.component';

describe('VenteAbosComponent', () => {
  let component: VenteAbosComponent;
  let fixture: ComponentFixture<VenteAbosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenteAbosComponent]
    });
    fixture = TestBed.createComponent(VenteAbosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
