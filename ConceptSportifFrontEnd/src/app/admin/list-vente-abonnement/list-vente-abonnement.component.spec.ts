import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVenteAbonnementComponent } from './list-vente-abonnement.component';

describe('ListVenteAbonnementComponent', () => {
  let component: ListVenteAbonnementComponent;
  let fixture: ComponentFixture<ListVenteAbonnementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListVenteAbonnementComponent]
    });
    fixture = TestBed.createComponent(ListVenteAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
