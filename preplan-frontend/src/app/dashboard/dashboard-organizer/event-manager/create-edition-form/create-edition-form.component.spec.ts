import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditionFormComponent } from './create-edition-form.component';

describe('CreateEditionFormComponent', () => {
  let component: CreateEditionFormComponent;
  let fixture: ComponentFixture<CreateEditionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
