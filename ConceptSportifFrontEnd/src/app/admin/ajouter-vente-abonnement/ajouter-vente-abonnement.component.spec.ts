import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterVenteAbonnementComponent } from './ajouter-vente-abonnement.component';

describe('AjouterVenteAbonnementComponent', () => {
  let component: AjouterVenteAbonnementComponent;
  let fixture: ComponentFixture<AjouterVenteAbonnementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterVenteAbonnementComponent]
    });
    fixture = TestBed.createComponent(AjouterVenteAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
