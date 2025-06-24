import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemToComboDataComponent } from './add-item-to-combo-data.component';

describe('AddItemToComboDataComponent', () => {
  let component: AddItemToComboDataComponent;
  let fixture: ComponentFixture<AddItemToComboDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddItemToComboDataComponent]
    });
    fixture = TestBed.createComponent(AddItemToComboDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
