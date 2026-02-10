import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDownloadlist } from './admin-downloadlist';

describe('AdminDownloadlist', () => {
  let component: AdminDownloadlist;
  let fixture: ComponentFixture<AdminDownloadlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDownloadlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDownloadlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
