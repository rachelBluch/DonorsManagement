import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonorsManegementService } from '../donors-manegement.service';
import { DatePipe, KeyValue } from '@angular/common';
import { Donation, DonationMethod } from '../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.css'],
  providers: [DatePipe]
})
export class CreateDonationComponent {

  currenciesList!: KeyValue<number, string>[]
  donorsList!: KeyValue<number, string>[]
  donationMethodsList!: DonationMethod[]
  donationToEdit!: Donation
  donorId!: number
  minDate!: Date;
  maxDate!: Date

  donationForm: FormGroup = this.fb.group({
    donationAmount: ['',Validators.required],
    donationCurrency: ['',Validators.required],
    donationDate: [new Date()],
    donationMethodId: ['',Validators.required],
    payments: [0],
    prayerName: [''],
    comments: [''],
    donorId: ['',Validators.required]
  });


  constructor(private fb: FormBuilder, private _service: DonorsManegementService,private datePipe: DatePipe, private route: ActivatedRoute, private router: Router) { 
    // this.donationForm.get('donationDate')?.setValue(this.datePipe.transform(new Date(), 'dd/MM/yyyy'));
    // this.donationForm.get('donationDate')?.valueChanges.subscribe((value) => {
    //   this.formattedDate = this.datePipe.transform(value, 'yyyy-MM-dd');
    // });
  }
  ngOnInit() {
    this.minDate = new Date()
    this.minDate.setFullYear(this.minDate.getFullYear() - 1)
    this._service.getCurrencies().subscribe(x => this.currenciesList = x)
    this._service.getDonationMethod().subscribe(x => this.donationMethodsList = x)
    this._service.getDonorsNames().subscribe(x => this.donorsList = x)
    this.route.params.subscribe(params => {
      let data = history.state;
      this.donationToEdit = data.element
      this.donorId = data.donorId
    });

    if (this.donationToEdit) {
      this.setDefaultValues()
    }
    if (this.donorId) {
      this.donationForm.get('donorId')?.patchValue(this.donorId)
    }
  }
  setDefaultValues(): void {
    const defaultValues = {
      donationAmount: this.donationToEdit.donationAmount / 100,
      donationCurrency: this.donationToEdit.donationCurrency,
      donationDate: this.donationToEdit.donationDate,
      donationMethodId: this.donationToEdit.donationMethodId,
      payments: this.donationToEdit.payments,
      prayerName: this.donationToEdit.prayerName,
      comments: this.donationToEdit.comments,
      donorId: this.donationToEdit.donorId
    };
    this.donationForm.patchValue(defaultValues);
  }

  close() {
    // this.dialogRef.close();
  }

  save() {
    const amountControl = this.donationForm.get('donationAmount');
    const newAmount = amountControl?.value;
    amountControl?.patchValue(newAmount * 100);

    const dateControl = this.donationForm.get('donationDate');
    const currentDate = dateControl?.value;
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    dateControl?.patchValue(newDate);
    if (this.donationToEdit) {
      this._service.editDonation(this.donationForm.value, this.donationToEdit.donationId).subscribe(x => {
        let data = { id: x.donationId , donorId:x.donorId};
        this.router.navigate(['/desktop'], { state: data });
      })
    }
    else
      this._service.addDonation(this.donationForm.value ?? {}).subscribe(x => {
        let data = { id: x.donationId , donorId:x.donorId };
        this.router.navigate(['/desktop'], { state: data });
      });

  }
 

}
