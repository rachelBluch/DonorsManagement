import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation, DonationMethod, Donor, Gift, GiftTable, Table } from './models';
import { DataFilter } from './filter-data/filter-data.models';
import { KeyValue } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DonorsManegementService {

  url: string = "DonorsManagement/"
  filter: string = "";

  constructor(private _http: HttpClient) { }

  getDonors(filters: DataFilter[] = []): Observable<Table[]> {
    const data = {
      filters: filters,
      filter: this.filter
    };
    return this._http.post<Table[]>(this.url + 'GetDonors', data)
  }

  getDonationsById(id: number): Observable<Donation[]> {
    return this._http.get<Donation[]>(this.url + 'GetDonationsById?donorId=' + id)
  }

  getGiftsById(id: number): Observable<Gift[]> {
    return this._http.get<Gift[]>(this.url + 'GetGiftsById?donorId=' + id)
  }
  getDonationMethod(): Observable<DonationMethod[]> {
    return this._http.get<DonationMethod[]>(this.url + 'GetDonationMethod')
  }

  addDonation(donation: Donation): Observable<Donation> {
    return this._http.post<Donation>(this.url + 'AddDonation', donation)
  }
  editDonation(donation: Donation, donationId: number): Observable<Donation> {
    donation.donationId = donationId;
    return this._http.put<Donation>(this.url + 'EditDonation', donation)
  }
  addGift(gift: Gift, donorId: number): Observable<Gift> {
    gift.donorId = donorId
    gift.giftId = 0
    return this._http.post<Gift>(this.url + 'AddGift', gift)
  }
  editGift(gift: string): Observable<Gift> {
    return this._http.put<Gift>(this.url + 'EditGift', gift)
  }
  addGiftNames(giftName: string): Observable<boolean> {
    var obj = {giftName :giftName}
    return this._http.post<boolean>(this.url + 'AddGiftNames', obj)

    // const jsonBody = JSON.stringify({ giftName }); // ממיר את המחרוזת לאובייקט JSON
    // return this._http.post<boolean>(this.url + '', jsonBody, {
    //     headers: { 'Content-Type': 'application/json' } // ציין את סוג התוכן
    // });
}

  addCity(cityName: string): Observable<boolean> {
    return this._http.post<boolean>(this.url + 'AddCity', cityName)
  }
  addDonor(donor: Donor): Observable<Donor> {
    return this._http.post<Donor>(this.url + 'AddDonor', donor)
  }
  editDonor(donor: Donor, donorId: number): Observable<Donor> {
    donor.donorId = donorId;
    return this._http.put<Donor>(this.url + 'EditDonor', donor)
  }
  deleteDonor(donorId: number): Observable<boolean> {
    return this._http.delete<boolean>(this.url + 'DeleteDonor?donorId=' + donorId)
  }
  deleteDonation(donationId: number): Observable<boolean> {
    return this._http.delete<boolean>(this.url + 'DeleteDonation?donationId=' + donationId)
  }
  deleteGift(giftId: number): Observable<boolean> {
    return this._http.delete<boolean>(this.url + 'DeleteGift?giftId=' + giftId)
  }
  getCurrencies(): Observable<KeyValue<number, string>[]> {
    return this._http.get<KeyValue<number, string>[]>(this.url + 'GetCurrencies')
  }
  getCities(): Observable<KeyValue<number, string>[]> {
    return this._http.get<KeyValue<number, string>[]>(this.url + 'GetCities')
  }
  getGiftNames(): Observable<KeyValue<number, string>[]> {
    return this._http.get<KeyValue<number, string>[]>(this.url + 'GetGiftNames')
  }
  getDonorsNames(): Observable<KeyValue<number, string>[]> {
    return this._http.get<KeyValue<number, string>[]>(this.url + 'GetDonorsNames')
  }

  //איך אפשר לנווט שיגיע לדף טבלה ולמצוא את האוביקט שאני שולח
}
