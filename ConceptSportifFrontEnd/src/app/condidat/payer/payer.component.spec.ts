import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayerComponent } from './payer.component';

describe('PayerComponent', () => {
  let component: PayerComponent;
  let fixture: ComponentFixture<PayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayerComponent]
    });
    fixture = TestBed.createComponent(PayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
