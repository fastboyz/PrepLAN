import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorPanelComponent } from './coordinator-panel.component';

describe('CoordinatorPanelComponent', () => {
  let component: CoordinatorPanelComponent;
  let fixture: ComponentFixture<CoordinatorPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
