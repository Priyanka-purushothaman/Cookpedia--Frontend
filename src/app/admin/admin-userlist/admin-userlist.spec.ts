import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserlist } from './admin-userlist';

describe('AdminUserlist', () => {
  let component: AdminUserlist;
  let fixture: ComponentFixture<AdminUserlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
