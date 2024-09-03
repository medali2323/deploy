import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBonSprtieComponent } from './edit-bon-sprtie.component';

describe('EditBonSprtieComponent', () => {
  let component: EditBonSprtieComponent;
  let fixture: ComponentFixture<EditBonSprtieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBonSprtieComponent]
    });
    fixture = TestBed.createComponent(EditBonSprtieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
