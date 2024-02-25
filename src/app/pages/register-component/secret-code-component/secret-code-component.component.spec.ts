import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretCodeComponentComponent } from './secret-code-component.component';

describe('SecretCodeComponentComponent', () => {
  let component: SecretCodeComponentComponent;
  let fixture: ComponentFixture<SecretCodeComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretCodeComponentComponent]
    });
    fixture = TestBed.createComponent(SecretCodeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
