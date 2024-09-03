import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRepresentantsComponent } from './liste-representants.component';

describe('ListeRepresentantsComponent', () => {
  let component: ListeRepresentantsComponent;
  let fixture: ComponentFixture<ListeRepresentantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeRepresentantsComponent]
    });
    fixture = TestBed.createComponent(ListeRepresentantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
