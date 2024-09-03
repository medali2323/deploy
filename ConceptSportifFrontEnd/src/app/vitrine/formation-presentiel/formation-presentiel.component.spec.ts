import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationPresentielComponent } from './formation-presentiel.component';

describe('FormationPresentielComponent', () => {
  let component: FormationPresentielComponent;
  let fixture: ComponentFixture<FormationPresentielComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationPresentielComponent]
    });
    fixture = TestBed.createComponent(FormationPresentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
