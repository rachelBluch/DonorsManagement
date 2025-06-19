import { Injectable } from "@angular/core";

// import '/lib'
    

export class HebrewParts{
    Day!: string;
    Month!: string;
    Year!: string;
}
declare var require: any;

@Injectable()
export class DateService {
    getValue(): any {
        return 'real value';
    }

    private gimatria ={
        "15":"טו",
        "16":"טז",
        "1":"א",
        "2":"ב",
        "3":"ג",
        "4":"ד",
        "5":"ה",
        "6":"ו",
        "7":"ז",
        "8":"ח",
        "9":"ט",
        "10":"י",
        "20":"כ",
        "30":"ל",
        "40":"מ",
        "50":"נ",
        "60":"ס",
        "70":"ע",
        "80":"פ",
        "90":"צ",
        "100":"ק",
        "200":"ר",
        "300":"ש",
        "400":"ת",
        "500":"תק",
        "600":"תר",
        "700":"תש",
        "800":"תת",
        "900":"תתק"
    };

    _daysInMonthNames=['א','ב','ג','ד','ה','ו','ז','ח','ט','י','יא','יב','יג','יד','טו','טז','יז','יח','יט','כ','כא','כב','כג','כד','כה','כו','כז','כח','כט','ל'];
    

    private _hebrewMonth: string[] = ['תשרי','חשון','כסלו','טבת','שבט','אדר','אדר ב','ניסן','אייר','סיון','תמוז','אב','אלול'];

    
    public get hebrewMonth() : string[]{
        return this._hebrewMonth;
    }

    public get DaysInMonthNames(){
        return this._daysInMonthNames;
    }

    constructor() {
       
    }

    getHebrewParts(date: Date){
        let value = this.getHebrewDate(date);
        let res = new HebrewParts();
        res.Day = this.getGimatria(value.date);
        res.Month = this.hebrewMonth[value.month-1];
        res.Year = this.getGimatria(value.year%1000);
        return res;
    }

    getHebrewDate(date: Date) {
        "use strict";
        var hebrewDate = require("hebrew-date");
        return hebrewDate(date.getFullYear(), date.getMonth(), date.getDate());
    }

    getHebrewString(date: Date){
        date = new Date(date);
        var hebrewDate = this.getHebrewDate(new Date(date.getFullYear(), date.getMonth()+1, date.getDate()));
        let month : string = this.hebrewMonth[hebrewDate.month-1];
        let day : string = this.getHebrewDay(hebrewDate.date);
        let year : string = this.getHebrewYear(hebrewDate.year);
        
        return day + "  " + month + " " + year;
    }

    format(date:Date){
        let month : string = this.hebrewMonth[date.getMonth()];
        let day : string = this.getHebrewDay(date.getDate());
        let year : string = this.getHebrewYear(date.getFullYear());
        return day + " " + month + " " + year;
  
    }

    getHebrewDay(day: number): string {
        if((this.gimatria as any)[day]){
            
            return (this.gimatria as any)[day];
            
        }
        
        return this.getGimatria(day);
    }

    getHebrewYear(year: number): string {
        year = year % 1000;
        return this.getGimatria(year);
    }

    private getGimatria(n: number): string {
        let result: string = "";
        let i = 10;
        while (n) {
            let d = n % i;
            if(d>0)
                result = (this.gimatria as any)[d] + result;
            n = n - d;
            i *= 10;
        }
        return result;

    }
}