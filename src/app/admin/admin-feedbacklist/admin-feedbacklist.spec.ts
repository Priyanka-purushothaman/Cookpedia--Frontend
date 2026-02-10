import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeedbacklist } from './admin-feedbacklist';

describe('AdminFeedbacklist', () => {
  let component: AdminFeedbacklist;
  let fixture: ComponentFixture<AdminFeedbacklist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFeedbacklist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeedbacklist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
