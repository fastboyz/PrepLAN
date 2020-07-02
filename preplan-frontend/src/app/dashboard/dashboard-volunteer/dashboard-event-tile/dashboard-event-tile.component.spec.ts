import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventTileComponent } from './dashboard-event-tile.component';

describe('DashboardEventTileComponent', () => {
  let component: DashboardEventTileComponent;
  let fixture: ComponentFixture<DashboardEventTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEventTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
