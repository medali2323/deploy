import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategCondidatComponent } from './liste-categ-condidat.component';

describe('ListeCategCondidatComponent', () => {
  let component: ListeCategCondidatComponent;
  let fixture: ComponentFixture<ListeCategCondidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCategCondidatComponent]
    });
    fixture = TestBed.createComponent(ListeCategCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
