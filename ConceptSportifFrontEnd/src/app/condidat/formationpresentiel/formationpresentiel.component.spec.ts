import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationpresentielComponent } from './formationpresentiel.component';

describe('FormationpresentielComponent', () => {
  let component: FormationpresentielComponent;
  let fixture: ComponentFixture<FormationpresentielComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationpresentielComponent]
    });
    fixture = TestBed.createComponent(FormationpresentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
