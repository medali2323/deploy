import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeInstructeursComponent } from './liste-instructeurs.component';

describe('ListeInstructeursComponent', () => {
  let component: ListeInstructeursComponent;
  let fixture: ComponentFixture<ListeInstructeursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeInstructeursComponent]
    });
    fixture = TestBed.createComponent(ListeInstructeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
