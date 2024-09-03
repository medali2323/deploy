import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategFormationComponent } from './liste-categ-formation.component';

describe('ListeCategFormationComponent', () => {
  let component: ListeCategFormationComponent;
  let fixture: ComponentFixture<ListeCategFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCategFormationComponent]
    });
    fixture = TestBed.createComponent(ListeCategFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
