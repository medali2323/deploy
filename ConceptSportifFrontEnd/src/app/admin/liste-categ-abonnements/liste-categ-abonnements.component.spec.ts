import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategAbonnementsComponent } from './liste-categ-abonnements.component';

describe('ListeCategAbonnementsComponent', () => {
  let component: ListeCategAbonnementsComponent;
  let fixture: ComponentFixture<ListeCategAbonnementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCategAbonnementsComponent]
    });
    fixture = TestBed.createComponent(ListeCategAbonnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
