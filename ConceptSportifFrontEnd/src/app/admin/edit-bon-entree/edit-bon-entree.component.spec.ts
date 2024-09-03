import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBonEntreeComponent } from './edit-bon-entree.component';

describe('EditBonEntreeComponent', () => {
  let component: EditBonEntreeComponent;
  let fixture: ComponentFixture<EditBonEntreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBonEntreeComponent]
    });
    fixture = TestBed.createComponent(EditBonEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
