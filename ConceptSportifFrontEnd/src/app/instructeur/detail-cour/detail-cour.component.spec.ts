import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCourComponent } from './detail-cour.component';

describe('DetailCourComponent', () => {
  let component: DetailCourComponent;
  let fixture: ComponentFixture<DetailCourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCourComponent]
    });
    fixture = TestBed.createComponent(DetailCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
