import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DonorsManegementService } from '../donors-manegement.service';
import { Donation, DonationMethod, Donor } from '../models';
import { Router } from '@angular/router';
import { KeyValue } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent {

  @Input() donorId!: number
  @Output() refreshData = new EventEmitter<string>();

  constructor(private _service: DonorsManegementService,private router: Router, private _snackBar: MatSnackBar) { }
  dataSource: Donation[] = [];
  donationMethod: DonationMethod[] = [];
  currenciesList!: KeyValue<number, string>[]
  method!: DonationMethod
  currency!: KeyValue<number,string>

  edit!:boolean
  
  ngOnInit(): void {
    if(this.donorId){
      this._service.getDonationsById(this.donorId).subscribe(x => this.dataSource = x)
       this._service.getDonationMethod().subscribe(x =>{
        this.donationMethod = x
      } )
      this._service.getCurrencies().subscribe(x=>{
        this.currenciesList = x
      })
    }
    
  }
  getMethod(method: number) {
      this.donationMethod.map(y => {
          if (y.donationMethodId == method)
            this.method = y
        })
        return this.method?this.method:null
  }
  getCurrency(currency: number) {
    this.currenciesList.map(y => {
        if (y.key == currency)
          this.currency = y
      })
      return this.currency?this.currency:null
}
  columnsToDisplay = ['donationDate', 'donationAmount', 'donationCurrency', 'payments', 'donationMethodId', 'prayerName', 'comments','edit','delete'];
  namesToDisplay = ['תאריך', 'סכום', 'מטבע', 'תשלומים', 'אופן התשלום', 'שם לתפילה', 'הערה'];

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Donation;


  navigateToCreateDonation(element:Donation) {
    let data = { element: element};
    this.router.navigate(['/createDonation'], { state: data });
  }
  deleted(donationId:number){
     this._snackBar.open(`?האם אתה בטוח שברצונך למחוק את התרומה:`, 'אישור', {
      duration: 5000,
    }).onAction().subscribe(() => {
    this._service.deleteDonation(donationId).subscribe(x=>{
      if(x){
        this.refreshData.emit('refresh');
      }
    }); 
  })
  } 
   

}

