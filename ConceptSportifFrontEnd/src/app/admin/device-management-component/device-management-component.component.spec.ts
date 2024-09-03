import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceManagementComponentComponent } from './device-management-component.component';

describe('DeviceManagementComponentComponent', () => {
  let component: DeviceManagementComponentComponent;
  let fixture: ComponentFixture<DeviceManagementComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceManagementComponentComponent]
    });
    fixture = TestBed.createComponent(DeviceManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
