import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOperationCompteComponent } from './list-operation-compte.component';

describe('ListOperationCompteComponent', () => {
  let component: ListOperationCompteComponent;
  let fixture: ComponentFixture<ListOperationCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOperationCompteComponent]
    });
    fixture = TestBed.createComponent(ListOperationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
