export interface Columns {
    title: string
    field: string
    display?: boolean
    filterable?: boolean
    filterType?: number
    displayType?: number;
    filterField?: string
    checked?: boolean
    donationAmount?: number[]
    donationDate?: Date[]
}
export interface DataFilter{
    column: string;
    columnName: string;
    columnData:ColumnData[];
    type?: number;
    filterField: string;
}
export interface ColumnData {
    data: object;
    count: number;
    check?: boolean;
}

// export interface StatisticsChecked{
//     columnName:string;
//     check:boolean;
// }
