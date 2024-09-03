import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationAlaDemandeComponent } from './formation-ala-demande.component';

describe('FormationAlaDemandeComponent', () => {
  let component: FormationAlaDemandeComponent;
  let fixture: ComponentFixture<FormationAlaDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationAlaDemandeComponent]
    });
    fixture = TestBed.createComponent(FormationAlaDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
