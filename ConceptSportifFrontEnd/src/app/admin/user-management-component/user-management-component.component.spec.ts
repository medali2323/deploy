import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementComponentComponent } from './user-management-component.component';

describe('UserManagementComponentComponent', () => {
  let component: UserManagementComponentComponent;
  let fixture: ComponentFixture<UserManagementComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagementComponentComponent]
    });
    fixture = TestBed.createComponent(UserManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
