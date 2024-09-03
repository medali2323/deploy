import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvennementsComponent } from './evennements.component';

describe('EvennementsComponent', () => {
  let component: EvennementsComponent;
  let fixture: ComponentFixture<EvennementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvennementsComponent]
    });
    fixture = TestBed.createComponent(EvennementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
