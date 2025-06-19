import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDataComponent } from './filter-data.component';

describe('FilterDataComponent', () => {
  let component: FilterDataComponent;
  let fixture: ComponentFixture<FilterDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterDataComponent]
    });
    fixture = TestBed.createComponent(FilterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
