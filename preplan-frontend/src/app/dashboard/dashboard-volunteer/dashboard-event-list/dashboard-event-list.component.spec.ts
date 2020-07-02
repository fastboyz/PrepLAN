import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventListComponent } from './dashboard-event-list.component';

describe('DashboardEventListComponent', () => {
  let component: DashboardEventListComponent;
  let fixture: ComponentFixture<DashboardEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
