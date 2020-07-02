import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventManagerComponent } from './dashboard-event-manager.component';

describe('DashboardEventManagerComponent', () => {
  let component: DashboardEventManagerComponent;
  let fixture: ComponentFixture<DashboardEventManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEventManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
