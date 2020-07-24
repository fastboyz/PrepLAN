import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVolunteerListComponent } from './event-volunteer-list.component';

describe('EventVolunteerListComponent', () => {
  let component: EventVolunteerListComponent;
  let fixture: ComponentFixture<EventVolunteerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventVolunteerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVolunteerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
