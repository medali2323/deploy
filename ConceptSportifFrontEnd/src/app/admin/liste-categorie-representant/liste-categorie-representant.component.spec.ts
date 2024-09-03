import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategorieRepresentantComponent } from './liste-categorie-representant.component';

describe('ListeCategorieRepresentantComponent', () => {
  let component: ListeCategorieRepresentantComponent;
  let fixture: ComponentFixture<ListeCategorieRepresentantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCategorieRepresentantComponent]
    });
    fixture = TestBed.createComponent(ListeCategorieRepresentantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
