import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageRecipe } from './admin-manage-recipe';

describe('AdminManageRecipe', () => {
  let component: AdminManageRecipe;
  let fixture: ComponentFixture<AdminManageRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminManageRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
