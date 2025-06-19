import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsTableComponent } from './donors-table.component';

describe('DonorsTableComponent', () => {
  let component: DonorsTableComponent;
  let fixture: ComponentFixture<DonorsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorsTableComponent]
    });
    fixture = TestBed.createComponent(DonorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
