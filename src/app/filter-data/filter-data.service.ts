import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Columns, DataFilter } from './filter-data.models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FilterDataService {

  filterables: any[] = [];
  private dataFilters = new BehaviorSubject<DataFilter[]>([]);
  public dataFilters$ = this.dataFilters.asObservable();
  isDataFilter: boolean = false;
  private lastFilters: DataFilter[] = [];
  lastDataFilter: DataFilter[] = [];

  startDateString!: string;
  endDateString!: string;
  startAndEndString!: string;
  url: string = "DonorsManagement/"

  constructor(private _http: HttpClient) {
  }
  getData(): Observable<Columns[]> {
    return this._http.get<Columns[]>(this.url + 'GetJsonFile');
  }
  getFilter(columnName: string) {
      return this.dataFilters.value.find(x => x.columnName == columnName);
  }

  get dataFiltersValue() {
    return this.dataFilters.value;
  }

  getDataFilters(lastDataFilter?: DataFilter) {
    this._http.get<DataFilter[]>(this.url + 'GetDataFilter').subscribe(x => {
      if (x)
        x.map(y => y.column = y.column.charAt(0).toLowerCase() + y.column.slice(1))
      // x.forEach(y=>y.checkStatistics=false)
      // this.lastFilters?.forEach(f => {
      //   let filter = x.find(t => t.columnName == f.columnName);
      //   filter?.columnData.forEach(d => d.check = !!f.columnData.find(fd => fd.data == d.data))
      // })
      this.dataFilters.next(x ?? []);
      this.isDataFilter = true;
    });
  }

  setFilterData(filters: DataFilter[]): Observable<boolean> {
    this.lastFilters = filters;
    const params = new Map<string, any>();
    params.set('filters', filters);
    return this._http.post<boolean>(this.url+'setFilterData', filters)
  }
}















// import { BehaviorSubject, filter, Observable } from "rxjs";
// import { dataFilter } from "./filter-data.model";
// import { ApiService } from "src/app/shared/services/api.service";
// import { CaseTableService } from "../case-table.service";
// import { NavigationStart, Router } from "@angular/router";






