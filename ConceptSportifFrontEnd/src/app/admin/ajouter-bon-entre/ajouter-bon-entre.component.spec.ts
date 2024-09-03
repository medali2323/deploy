import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBonEntreComponent } from './ajouter-bon-entre.component';

describe('AjouterBonEntreComponent', () => {
  let component: AjouterBonEntreComponent;
  let fixture: ComponentFixture<AjouterBonEntreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterBonEntreComponent]
    });
    fixture = TestBed.createComponent(AjouterBonEntreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
