import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';
import 'moment/locale/he'; // Optionally set Hebrew locale

import { HebrewDate } from 'hebrew-date';
import {
    toJewishDate,
    formatJewishDate,
    toHebrewJewishDate,
    formatJewishDateInHebrew,
    toGregorianDate,
    JewishMonth,
  } from "jewish-date";
  


// import { DateService } from './date.service';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    // constructor(private dateService: DateService) { }

    transform(date: Date): string {
        console.log("HebrewDate"+HebrewDate); 
        if (!date) {
            return '';
        }
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(date, 'dd/MM/yyyy');
        const hebrewDate = moment(formattedDate, 'DD/MM/YYYY').locale('he').format('iYYYY/iMM/iDD');


        // const ddate = moment(formattedDate, 'DD/MM/YYYY');
        // if (!ddate.isValid()) {
        //     return 'Invalid date';
        // }
        // // Convert to Hebrew date format
        // const hebrewDate = ddate.locale('he').format('iYYYY/iMM/iDD'); // Use the correct format for Hebrew dates
        const dateNew = new Date(date)
        const jewishDate = toJewishDate(dateNew?dateNew:new Date());
        console.log("jewishDate"+jewishDate); // { year: 5783, monthName: "Iyyar", month: 8, day: 18 }
        
        const jewishDateInEnglish = formatJewishDate(jewishDate);
        console.log(jewishDateInEnglish); // 18 Iyyar 5783
        
        const jewishDateInHebrew = toHebrewJewishDate(jewishDate);
        console.log(jewishDateInHebrew); // { day: "י״ח", monthName: "אייר", year: "התשפ״ג" }
        
        const jewishDateInHebrewStr = formatJewishDateInHebrew(jewishDate);
        console.log(jewishDateInHebrewStr);




    //     // convertToHebrew(gregorianDate: string): string {
    //         const parts = hebrewDate?hebrewDate:"".split('/');
    //         const day = parseInt(parts[0], 10)?parseInt(parts[0], 10):0;
    //         const month = parseInt(parts[1], 10)?parseInt(parts[1], 10):0;
    //         const year = parseInt(parts[2], 10)?parseInt(parts[2], 10):0;
    //         const hebrewDated = HebrewDate.gregorianToHebrew(year, month, day);
    //         const returned= hebrewDated.getFullYear()+" "+"/"+" "+hebrewDated.getMonth()+" " + 1/hebrewDated.getDate()
    // // }


    // if (!formattedDate) {
    //     return 'Invalid date';
    // }
    
    // const parts = formattedDate.split('/');
    
    // if (parts.length !== 3) {
    //     return 'Invalid date format';
    // }

    // const day = parseInt(parts[0], 10);
    // const month = parseInt(parts[1], 10);
    // const year = parseInt(parts[2], 10);

    // // Validate day, month, and year
    // if (isNaN(day) || isNaN(month) || isNaN(year)) {
    //     return 'Invalid date';
    // }

    // const hebrewDated = HebrewDate.gregorianToHebrew(year, month, day);
    // return `${hebrewDated.getFullYear()}/${hebrewDated.getMonth() + 1}/${hebrewDated.getDate()}`;


        return `${jewishDateInHebrewStr}\n${formattedDate}`;
    }
    // transform(value: Date | number) {
    //     if (value instanceof Date)
    //         return this.dateService.getHebrewString(new Date(value));
    //     else
    //         return this.dateService.getHebrewDay(value)
    // }

}
@Pipe({
    name: 'dateHebrew'
})
export class DateHebrewPipe implements PipeTransform {
    transform(gregorianDate: string): string {
        const hebrewDate = moment(gregorianDate).locale('he').format('iYYYY/iMM/iDD'); // Hebrew Date Format
        return hebrewDate || '';
    }
}
@Pipe({
    name: 'countDonation'
})
export class CountDonation implements PipeTransform {
    transform(count: number | any) {
        return count / 100
    }
}
