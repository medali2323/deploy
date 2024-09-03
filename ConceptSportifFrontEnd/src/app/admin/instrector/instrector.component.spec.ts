import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrectorComponent } from './instrector.component';

describe('InstrectorComponent', () => {
  let component: InstrectorComponent;
  let fixture: ComponentFixture<InstrectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrectorComponent]
    });
    fixture = TestBed.createComponent(InstrectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
