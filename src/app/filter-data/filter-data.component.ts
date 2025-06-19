import { Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { DataFilter } from './filter-data.models';
import { FilterDataService } from './filter-data.service';
import { KeyValue } from '@angular/common';
import { DonorsManegementService } from '../donors-manegement.service';

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.css']
})
export class FilterDataComponent implements OnInit {
  @Input() columnName!: string;
  dataFilter!: DataFilter;
  show: boolean = false;
  allSelected: boolean = false;
  citiesList!: KeyValue<number, string>[]
  city!: KeyValue<number, string>
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    this.show = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["columnName"]) {
      this.getDataFilter()
      if (this.columnName != null)
        this.show = true;
      else
        this.show = false;
    }
  }

  constructor(private filterDataService: FilterDataService, private _service: DonorsManegementService) {
    this.filterDataService.dataFilters$.subscribe(filters => this.getDataFilter())
  }
  ngOnInit(): void {
    this._service.getCities().subscribe(x => {
      this.citiesList = x;
    });
  }
  getDataFilter() {
    let dataFilter = this.filterDataService.getFilter(this.columnName);
    this.dataFilter = dataFilter != undefined ? dataFilter : this.dataFilter;
  }
  getCities(city: any) {
    city = Number(city)
      this.citiesList.map(y => {
      if (y.key == city)
      this.city = y
    })
    return this.city ? this.city : null
  }
  // getStatistics() {
  //     this.caseTableService.getStatisticsByColumn(this.columnName, this.columnName).subscribe(x => {
  //         // const dialogRef = this.dialog.open(StatisticsDialogComponent)

  //         const dialogRef = this.dialog.open(StatisticsDialogComponent, {
  //             data: { data: x },
  //         });
  //     })
  // }

}


// import { dataFilter } from './filter-data.model';
// import { FilterDataService } from './filter-data.service';
// import { CaseTableService } from '../case-table.service';
// import { MatDialog } from '@angular/material/dialog';
// import { StatisticsDialogComponent } from '../statistics-dialog/statistics-dialog.component';

