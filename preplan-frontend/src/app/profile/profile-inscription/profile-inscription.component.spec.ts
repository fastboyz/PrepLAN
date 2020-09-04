import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInscriptionComponent } from './profile-inscription.component';

describe('ProfileInscriptionComponent', () => {
  let component: ProfileInscriptionComponent;
  let fixture: ComponentFixture<ProfileInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
