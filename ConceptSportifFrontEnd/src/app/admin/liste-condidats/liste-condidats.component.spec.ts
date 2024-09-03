import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCondidatsComponent } from './liste-condidats.component';

describe('ListeCondidatsComponent', () => {
  let component: ListeCondidatsComponent;
  let fixture: ComponentFixture<ListeCondidatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCondidatsComponent]
    });
    fixture = TestBed.createComponent(ListeCondidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
