import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourComponent } from './edit-cour.component';

describe('EditCourComponent', () => {
  let component: EditCourComponent;
  let fixture: ComponentFixture<EditCourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCourComponent]
    });
    fixture = TestBed.createComponent(EditCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
