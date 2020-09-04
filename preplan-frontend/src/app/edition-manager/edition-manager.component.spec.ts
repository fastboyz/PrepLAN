import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionManagerComponent } from './edition-manager.component';

describe('EditionManagerComponent', () => {
  let component: EditionManagerComponent;
  let fixture: ComponentFixture<EditionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
