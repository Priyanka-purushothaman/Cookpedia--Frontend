import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipelist } from './admin-recipelist';

describe('AdminRecipelist', () => {
  let component: AdminRecipelist;
  let fixture: ComponentFixture<AdminRecipelist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRecipelist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecipelist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
