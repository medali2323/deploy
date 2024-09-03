import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursalademandeComponent } from './coursalademande.component';

describe('CoursalademandeComponent', () => {
  let component: CoursalademandeComponent;
  let fixture: ComponentFixture<CoursalademandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursalademandeComponent]
    });
    fixture = TestBed.createComponent(CoursalademandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
