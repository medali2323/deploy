import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonEntreComponent } from './list-bon-entre.component';

describe('ListBonEntreComponent', () => {
  let component: ListBonEntreComponent;
  let fixture: ComponentFixture<ListBonEntreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBonEntreComponent]
    });
    fixture = TestBed.createComponent(ListBonEntreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
