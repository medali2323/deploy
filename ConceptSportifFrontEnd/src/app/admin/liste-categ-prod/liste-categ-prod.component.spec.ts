import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategProdComponent } from './liste-categ-prod.component';

describe('ListeCategProdComponent', () => {
  let component: ListeCategProdComponent;
  let fixture: ComponentFixture<ListeCategProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCategProdComponent]
    });
    fixture = TestBed.createComponent(ListeCategProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
