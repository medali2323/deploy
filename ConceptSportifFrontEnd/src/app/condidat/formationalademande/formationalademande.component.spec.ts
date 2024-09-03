import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationalademandeComponent } from './formationalademande.component';

describe('FormationalademandeComponent', () => {
  let component: FormationalademandeComponent;
  let fixture: ComponentFixture<FormationalademandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationalademandeComponent]
    });
    fixture = TestBed.createComponent(FormationalademandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
