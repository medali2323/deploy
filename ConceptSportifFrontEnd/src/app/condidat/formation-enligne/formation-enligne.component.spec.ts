import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationEnligneComponent } from './formation-enligne.component';

describe('FormationEnligneComponent', () => {
  let component: FormationEnligneComponent;
  let fixture: ComponentFixture<FormationEnligneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationEnligneComponent]
    });
    fixture = TestBed.createComponent(FormationEnligneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
