import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformationComponent } from './editformation.component';

describe('EditformationComponent', () => {
  let component: EditformationComponent;
  let fixture: ComponentFixture<EditformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditformationComponent]
    });
    fixture = TestBed.createComponent(EditformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
