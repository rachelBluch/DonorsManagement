import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorDaialogComponent } from './donor-daialog.component';

describe('DonorDaialogComponent', () => {
  let component: DonorDaialogComponent;
  let fixture: ComponentFixture<DonorDaialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorDaialogComponent]
    });
    fixture = TestBed.createComponent(DonorDaialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
