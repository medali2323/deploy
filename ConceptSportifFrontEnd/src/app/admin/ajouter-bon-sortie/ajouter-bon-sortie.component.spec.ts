import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBonSortieComponent } from './ajouter-bon-sortie.component';

describe('AjouterBonSortieComponent', () => {
  let component: AjouterBonSortieComponent;
  let fixture: ComponentFixture<AjouterBonSortieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterBonSortieComponent]
    });
    fixture = TestBed.createComponent(AjouterBonSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
