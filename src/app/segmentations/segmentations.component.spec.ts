import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationsComponent } from './segmentations.component';

describe('SegmentationsComponent', () => {
  let component: SegmentationsComponent;
  let fixture: ComponentFixture<SegmentationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentationsComponent]
    });
    fixture = TestBed.createComponent(SegmentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
