import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategorieInstructeurComponent } from './liste-categorie-instructeur.component';

describe('ListeCategorieInstructeurComponent', () => {
  let component: ListeCategorieInstructeurComponent;
  let fixture: ComponentFixture<ListeCategorieInstructeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCategorieInstructeurComponent]
    });
    fixture = TestBed.createComponent(ListeCategorieInstructeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
