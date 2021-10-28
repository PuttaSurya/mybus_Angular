import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFeedbackComponent } from './service-feedback.component';

describe('ServiceFeedbackComponent', () => {
  let component: ServiceFeedbackComponent;
  let fixture: ComponentFixture<ServiceFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
