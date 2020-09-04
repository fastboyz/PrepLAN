import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionEventFormComponent } from './inscription-event-form.component';

describe('InscriptionEventFormComponent', () => {
  let component: InscriptionEventFormComponent;
  let fixture: ComponentFixture<InscriptionEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
