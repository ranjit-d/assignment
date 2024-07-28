import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesheetComponent } from './employeesheet.component';

describe('EmployeesheetComponent', () => {
  let component: EmployeesheetComponent;
  let fixture: ComponentFixture<EmployeesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
