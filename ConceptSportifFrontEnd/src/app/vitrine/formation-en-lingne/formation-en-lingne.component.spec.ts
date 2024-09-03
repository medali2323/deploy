import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationEnLingneComponent } from './formation-en-lingne.component';

describe('FormationEnLingneComponent', () => {
  let component: FormationEnLingneComponent;
  let fixture: ComponentFixture<FormationEnLingneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationEnLingneComponent]
    });
    fixture = TestBed.createComponent(FormationEnLingneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
