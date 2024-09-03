import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSalleDeSportsComponent } from './liste-salle-de-sports.component';

describe('ListeSalleDeSportsComponent', () => {
  let component: ListeSalleDeSportsComponent;
  let fixture: ComponentFixture<ListeSalleDeSportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeSalleDeSportsComponent]
    });
    fixture = TestBed.createComponent(ListeSalleDeSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
