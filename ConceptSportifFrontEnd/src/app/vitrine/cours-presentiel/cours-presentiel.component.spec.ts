import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursPresentielComponent } from './cours-presentiel.component';

describe('CoursPresentielComponent', () => {
  let component: CoursPresentielComponent;
  let fixture: ComponentFixture<CoursPresentielComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursPresentielComponent]
    });
    fixture = TestBed.createComponent(CoursPresentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
