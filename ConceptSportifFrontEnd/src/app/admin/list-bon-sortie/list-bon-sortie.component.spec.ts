import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonSortieComponent } from './list-bon-sortie.component';

describe('ListBonSortieComponent', () => {
  let component: ListBonSortieComponent;
  let fixture: ComponentFixture<ListBonSortieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBonSortieComponent]
    });
    fixture = TestBed.createComponent(ListBonSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
