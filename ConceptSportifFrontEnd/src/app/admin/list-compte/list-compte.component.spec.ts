import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompteComponent } from './list-compte.component';

describe('ListCompteComponent', () => {
  let component: ListCompteComponent;
  let fixture: ComponentFixture<ListCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCompteComponent]
    });
    fixture = TestBed.createComponent(ListCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
