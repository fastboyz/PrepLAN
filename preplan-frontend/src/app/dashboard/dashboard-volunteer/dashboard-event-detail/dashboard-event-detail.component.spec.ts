import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventDetailComponent } from './dashboard-event-detail.component';

describe('DashboardEventDetailComponent', () => {
  let component: DashboardEventDetailComponent;
  let fixture: ComponentFixture<DashboardEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
