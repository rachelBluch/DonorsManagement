import { KeyValue } from '@angular/common';
import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { DonorsManegementService } from 'src/app/donors-manegement.service';
import { ColumnData, DataFilter } from 'src/app/filter-data/filter-data.models';
import { FilterDataService } from 'src/app/filter-data/filter-data.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() filters: DataFilter[] = [];
  @Output() filterRemoved = new EventEmitter<DataFilter>();
  citiesList!: KeyValue<number, string>[]
  city!: KeyValue<number, string>
  constructor(public filterService: FilterDataService, private _service: DonorsManegementService) {}
  ngOnInit(){
     this._service.getCities().subscribe(x => {
      this.citiesList = x;
    });
  }
  remove(filter: DataFilter, data: ColumnData) {
    console.log(this.filterService.dataFiltersValue);
    const f: DataFilter = {
      column: filter.column,
      columnData: [data],
      columnName: filter.columnName,
      filterField: filter.filterField,
      type: filter.type
    };
    data.check = false;
    this.filterRemoved.emit(f);
  }
  // removey() {
  //   console.log(this.filterService.dataFiltersValue);

  //   // const f :DataFilter= {
  //   //   column: filter.column,
  //   //   columnData:[data],
  //   //   columnName : filter.columnName,
  //   //   filterField: filter.filterField,
  //   //   type : filter.type
  //   // };
  //   // data.check = false;
  //   // this.filterRemoved.emit(f);
  // }
   getCities(city: any) {
    city = Number(city)
      this.citiesList.map(y => {
      if (y.key == city)
      this.city = y
    })
    return this.city ? this.city : null
  }
}
