import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstructorToFormationComponent } from './add-instructor-to-formation.component';

describe('AddInstructorToFormationComponent', () => {
  let component: AddInstructorToFormationComponent;
  let fixture: ComponentFixture<AddInstructorToFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInstructorToFormationComponent]
    });
    fixture = TestBed.createComponent(AddInstructorToFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
