import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalledesportComponent } from './edit-salledesport.component';

describe('EditSalledesportComponent', () => {
  let component: EditSalledesportComponent;
  let fixture: ComponentFixture<EditSalledesportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSalledesportComponent]
    });
    fixture = TestBed.createComponent(EditSalledesportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
