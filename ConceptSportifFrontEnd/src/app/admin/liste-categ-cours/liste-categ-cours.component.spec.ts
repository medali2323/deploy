import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategCoursComponent } from './liste-categ-cours.component';

describe('ListeCategCoursComponent', () => {
  let component: ListeCategCoursComponent;
  let fixture: ComponentFixture<ListeCategCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCategCoursComponent]
    });
    fixture = TestBed.createComponent(ListeCategCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
