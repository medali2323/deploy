import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaComponent } from './ca.component';

describe('CaComponent', () => {
  let component: CaComponent;
  let fixture: ComponentFixture<CaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaComponent]
    });
    fixture = TestBed.createComponent(CaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
