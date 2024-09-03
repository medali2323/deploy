import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursEnligneComponent } from './cours-enligne.component';

describe('CoursEnligneComponent', () => {
  let component: CoursEnligneComponent;
  let fixture: ComponentFixture<CoursEnligneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursEnligneComponent]
    });
    fixture = TestBed.createComponent(CoursEnligneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
