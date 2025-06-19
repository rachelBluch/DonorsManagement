import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DonorDaialogComponent } from '../donor-daialog/donor-daialog.component';
import { DonorsTableComponent } from '../donors-table/donors-table.component';
import { ActivatedRoute } from '@angular/router';
import { FilterDataService } from '../filter-data/filter-data.service';
import { DataFilter } from '../filter-data/filter-data.models';
import { SegmentationsComponent } from '../segmentations/segmentations.component';
import { DonorsManegementService } from '../donors-manegement.service';


@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent {
  @ViewChild(DonorsTableComponent) donorsTableComponent!: DonorsTableComponent;
  @ViewChild(SegmentationsComponent) segmentationsComponent!: SegmentationsComponent;
  id!: number
  icon: string = "filter_alt_icon"

  constructor(public dialog: MatDialog, public filterService: FilterDataService, public donorsManegementService: DonorsManegementService, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      let data = history.state;
      this.id = data.donorId
    });
  }

  ngOnInit() {
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DonorDaialogComponent, {
      width: '26%',
      height: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(x => {
      this.donorsTableComponent.getData()
    });
  }
  applyFilter() {
    let filters = this.filterService.dataFiltersValue.filter(x => x.columnData.find(c => c.check));
    this.filterService.dataFiltersValue.forEach(x => x.columnData = x.columnData.filter(c => c.check));
    // this.filterServicecribe(y => {
    //   if (y) 
    this.donorsTableComponent.getData(filters);
    // });
    this.filterService.lastDataFilter = filters;
  }
  removeFilter(filter: DataFilter) {
    let f = this.filterService.dataFiltersValue.find(x => x.columnName == filter.columnName)?.columnData.find(x => x.data == filter.columnData[0].data);
    if (f)
      f.check = false;
    this.applyFilter();
    this.segmentationsComponent.exchange()
  }

  segmentations() {
    this.icon = this.icon == "filter_alt_icon" ? "filter_alt_off_icon" : "filter_alt_icon"
  }
  applySearch(event: any) {
    this.filterService.getDataFilters();
    this.donorsTableComponent.getData()
  }

}
