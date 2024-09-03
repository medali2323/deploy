import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceilComponent } from './acceil.component';

describe('AcceilComponent', () => {
  let component: AcceilComponent;
  let fixture: ComponentFixture<AcceilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceilComponent]
    });
    fixture = TestBed.createComponent(AcceilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
