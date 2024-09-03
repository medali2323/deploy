import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstrictorComponent } from './edit-instrictor.component';

describe('EditInstrictorComponent', () => {
  let component: EditInstrictorComponent;
  let fixture: ComponentFixture<EditInstrictorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInstrictorComponent]
    });
    fixture = TestBed.createComponent(EditInstrictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
