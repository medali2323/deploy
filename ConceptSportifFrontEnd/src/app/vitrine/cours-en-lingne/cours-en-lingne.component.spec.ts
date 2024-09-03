import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursEnLingneComponent } from './cours-en-lingne.component';

describe('CoursEnLingneComponent', () => {
  let component: CoursEnLingneComponent;
  let fixture: ComponentFixture<CoursEnLingneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursEnLingneComponent]
    });
    fixture = TestBed.createComponent(CoursEnLingneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
