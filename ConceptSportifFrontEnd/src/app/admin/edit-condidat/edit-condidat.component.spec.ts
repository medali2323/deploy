import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCondidatComponent } from './edit-condidat.component';

describe('EditCondidatComponent', () => {
  let component: EditCondidatComponent;
  let fixture: ComponentFixture<EditCondidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCondidatComponent]
    });
    fixture = TestBed.createComponent(EditCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
