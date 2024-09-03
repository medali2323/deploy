import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApreposComponent } from './aprepos.component';

describe('ApreposComponent', () => {
  let component: ApreposComponent;
  let fixture: ComponentFixture<ApreposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApreposComponent]
    });
    fixture = TestBed.createComponent(ApreposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
