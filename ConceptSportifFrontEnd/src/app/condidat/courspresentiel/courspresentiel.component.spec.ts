import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourspresentielComponent } from './courspresentiel.component';

describe('CourspresentielComponent', () => {
  let component: CourspresentielComponent;
  let fixture: ComponentFixture<CourspresentielComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourspresentielComponent]
    });
    fixture = TestBed.createComponent(CourspresentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
