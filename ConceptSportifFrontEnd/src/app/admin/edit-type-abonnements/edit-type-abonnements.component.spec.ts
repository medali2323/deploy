import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeAbonnementsComponent } from './edit-type-abonnements.component';

describe('EditTypeAbonnementsComponent', () => {
  let component: EditTypeAbonnementsComponent;
  let fixture: ComponentFixture<EditTypeAbonnementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTypeAbonnementsComponent]
    });
    fixture = TestBed.createComponent(EditTypeAbonnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
