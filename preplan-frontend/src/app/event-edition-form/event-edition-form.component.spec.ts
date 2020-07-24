import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditionFormComponent } from './event-edition-form.component';

describe('EventEditionFormComponent', () => {
  let component: EventEditionFormComponent;
  let fixture: ComponentFixture<EventEditionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventEditionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
