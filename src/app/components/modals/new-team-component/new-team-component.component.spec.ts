import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeamComponentComponent } from './new-team-component.component';

describe('NewTeamComponentComponent', () => {
  let component: NewTeamComponentComponent;
  let fixture: ComponentFixture<NewTeamComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTeamComponentComponent]
    });
    fixture = TestBed.createComponent(NewTeamComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
