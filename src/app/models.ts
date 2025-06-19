import { Data } from "@angular/router"

export interface Donor {
    donorId:number,
    donorName:string,
    donorCity:number,
    donorAddress:string,
    shul:string,
    phone:string,
    email:string,
    comments:string
}

export interface Donation{
    donationId:number,
    donationAmount:number,
    donationCurrency:number,
    donationDate:Date,
    donationMethodId:number,
    payments:number,
    prayerName:string,
    comments:string,
    donorId:number
}

export interface Gift{
    giftId:number,
    giftName:number,
    receivedDate:Data,
    donorId:number
}
 export interface GiftTable{
    giftName:number,
    receivedDate:Data,
}
export interface DonationMethod{
    donationMethodId:number,
    donationMethodName:number,
}
export interface Table{
    donorId:number,
    donorName:string,
    donorCity:number,
    donorAddress:string,
    shul:string,
    phone:string,
    email:string,
    comments:string,
    donationAmount:number[]
    donationDate:Date[]
}