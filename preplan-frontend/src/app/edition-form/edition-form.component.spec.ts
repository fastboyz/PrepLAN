import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionFormComponent } from './edition-form.component';

describe('EditionFormComponent', () => {
  let component: EditionFormComponent;
  let fixture: ComponentFixture<EditionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
