import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypeAbonnementsComponent } from './liste-type-abonnements.component';

describe('ListeTypeAbonnementsComponent', () => {
  let component: ListeTypeAbonnementsComponent;
  let fixture: ComponentFixture<ListeTypeAbonnementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeTypeAbonnementsComponent]
    });
    fixture = TestBed.createComponent(ListeTypeAbonnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
