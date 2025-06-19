import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DonorsManegementService } from '../donors-manegement.service';
import { Router } from '@angular/router';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-donor-daialog',
  templateUrl: './donor-daialog.component.html',
  styleUrls: ['./donor-daialog.component.css']
})
export class DonorDaialogComponent implements OnInit {
  citiesList!: KeyValue<number, string>[]
  donorForm: FormGroup = this.fb.group({
    donorName: ['', Validators.required],
    donorCity: ['', Validators.required],
    donorAddress: [''],
    shul: [''],
    phone: [''],
    email: [''],
    comments: ['']
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DonorDaialogComponent>, private fb: FormBuilder, private _service: DonorsManegementService, private router: Router) { }
  ngOnInit() {
    this._service.getCities().subscribe(x => {
      this.citiesList = x;
      if (this.data?.edit) {
        this.setDefaultValues();
      }
    });
  }
  setDefaultValues(): void {
    const defaultValues = {
      donorName: this.data.element.donorName,
      donorCity: this.data.element.donorCity,
      donorAddress: this.data.element.donorAddress,
      shul: this.data.element.shul,
      phone: this.data.element.phone,
      email: this.data.element.email,
      comments: this.data.element.comments
    };
    this.donorForm.patchValue(defaultValues);
  }

  close() {
    this.dialogRef.close();
  }

  save(continuation?: boolean) {

    if (this.data?.edit) {
      if (this.donorForm.valid) {
        this._service.editDonor(this.donorForm.value, this.data.element.donorId).subscribe(x => {
          if (x)
            this.dialogRef.close()
        });
      }
    }

    else {
      if (this.donorForm.valid) {
        this._service.addDonor(this.donorForm.value).subscribe(x => {
          if (x) {
            this.dialogRef.close()
            if (continuation)
              this.navigateToCreateDonation(x.donorId)
          }
        });
      }
    }

  }

  navigateToCreateDonation(element: number) {
    let data = { donorId: element };
    this.router.navigate(['/createDonation'], { state: data });
  }
}
