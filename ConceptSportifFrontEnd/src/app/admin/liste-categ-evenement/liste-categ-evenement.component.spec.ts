import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategEvenementComponent } from './liste-categ-evenement.component';

describe('ListeCategEvenementComponent', () => {
  let component: ListeCategEvenementComponent;
  let fixture: ComponentFixture<ListeCategEvenementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCategEvenementComponent]
    });
    fixture = TestBed.createComponent(ListeCategEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
