import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DonorsManegementService } from '../donors-manegement.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-gift-dialog',
  templateUrl: './gift-dialog.component.html',
  styleUrls: ['./gift-dialog.component.css']
})
export class GiftDialogComponent {

  minDate!: Date;
  maxDate!: Date
  giftsNameList!: KeyValue<number, string>[];
  addGift: boolean = false
  newGiftKeyValue!: KeyValue<number, string>;
  giftForm: FormGroup = this.fb.group({
    giftId: [''],
    giftName: ['', Validators.required],
    receivedDate: [new Date()],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<GiftDialogComponent>, private fb: FormBuilder, private _service: DonorsManegementService) { }

  ngOnInit() {
    this._service.getGiftNames().subscribe(x => this.giftsNameList = x)

    this.minDate = new Date()
    this.minDate.setFullYear(this.minDate.getFullYear() - 1)

    if (this.data?.edit) {
      this.setDefaultValues()
      this.giftForm.get('giftId')?.patchValue(this.data?.element.giftId)
    }
  }

  setDefaultValues(): void {
    const defaultValues = {
      giftName: this.data.element.giftName,
      receivedDate: this.data.element.receivedDate,
    };
    this.giftForm.patchValue(defaultValues);
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.data?.edit) {
      if (this.giftForm.valid) {
        this._service.editGift(this.giftForm.value).subscribe(x => {
          if (x)
            this.dialogRef.close()
        });
      }
    }

    else {
      if (this.giftForm.valid) {
        this._service.addGift(this.giftForm.value, this.data?.donorId).subscribe(x => {
          if (x) {
            this.dialogRef.close()
          }
        });
      }
    }
  }
  saveAddGiftFun(gift: any) {
    this.addGift = false
    const maxKey = Math.max(...this.giftsNameList.map(x => x.key));
    this.newGiftKeyValue = { key: maxKey, value: gift };
    this._service.getGiftNames().subscribe(x => this.giftsNameList = x)
  }
}
