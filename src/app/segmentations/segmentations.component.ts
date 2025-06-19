import { Component, EventEmitter, Output } from '@angular/core';
import { Columns } from '../filter-data/filter-data.models';
import { FilterDataService } from '../filter-data/filter-data.service';


@Component({
    selector: 'app-segmentations',
    templateUrl: './segmentations.component.html',
    styleUrls: ['./segmentations.component.css'],
})
export class SegmentationsComponent {
    @Output() filterData = new EventEmitter();

    data!: Columns[];
    displayFilters: Columns[] = [];
    displayFilters1: Columns[] = [];
    place!: number

    constructor( public filterDataService: FilterDataService) {
        this.filterDataService.getData().subscribe(x => {
            this.data = x
            this.data = this.data.filter(x => x.filterable == true);
            this.exchange()
        })
    };

    applyFilter() {
        this.filterData.emit()
        this.displayFilters = this.data.filter(x => !this.filterDataService.lastDataFilter.find(f => f.columnName == x.title)).slice(0, 5);
        this.exchange()
    }

    // getStatistics(){
    //     this.dialog.open(StatisticsDialogComponent)
    // }
    
   
    advertisers(i: number, tof: boolean) {
        if (tof || this.place != null) {
            let a = this.displayFilters[4];
            this.displayFilters[4] = this.displayFilters1[i];
            this.place = i
            this.displayFilters1[i] = a;
        }
    }

    exchange() {
        this.displayFilters = this.data.filter(x => !this.filterDataService.lastDataFilter.find(f => f.columnName == x.title)).slice(0, 5);
        this.displayFilters1 = this.data.filter(x => !this.displayFilters.includes(x) && !this.filterDataService.lastDataFilter.find(f => f.columnName == x.title))
        this.advertisers(this.place, false)
    }
}
