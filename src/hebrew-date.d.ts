declare module 'hebrew-date' {

    export class HebrewDate {
    
    static gregorianToHebrew(year: number, month: number, day: number): HebrewDate;
    
    getFullYear(): number;
    
    getMonth(): number;
    
    getDate(): number;
    
    }
    
    }