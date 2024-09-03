import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRepresantantComponent } from './edit-represantant.component';

describe('EditRepresantantComponent', () => {
  let component: EditRepresantantComponent;
  let fixture: ComponentFixture<EditRepresantantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRepresantantComponent]
    });
    fixture = TestBed.createComponent(EditRepresantantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
