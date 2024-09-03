import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PourcentagesComponent } from './pourcentages.component';

describe('PourcentagesComponent', () => {
  let component: PourcentagesComponent;
  let fixture: ComponentFixture<PourcentagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PourcentagesComponent]
    });
    fixture = TestBed.createComponent(PourcentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
