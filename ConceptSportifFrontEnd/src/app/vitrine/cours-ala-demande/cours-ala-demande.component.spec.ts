import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursAlaDemandeComponent } from './cours-ala-demande.component';

describe('CoursAlaDemandeComponent', () => {
  let component: CoursAlaDemandeComponent;
  let fixture: ComponentFixture<CoursAlaDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursAlaDemandeComponent]
    });
    fixture = TestBed.createComponent(CoursAlaDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
