import { Component, Input, SimpleChanges } from '@angular/core';
import { DonorsManegementService } from '../donors-manegement.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Donor } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { DonorDaialogComponent } from '../donor-daialog/donor-daialog.component';
import { FilterDataService } from '../filter-data/filter-data.service';
import { DataFilter } from '../filter-data/filter-data.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeyValue } from '@angular/common';



@Component({
  selector: 'app-donors-table',
  templateUrl: './donors-table.component.html',
  styleUrls: ['./donors-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DonorsTableComponent {
  @Input() donorId!: number
  isDonorIdChange!: boolean
  citiesList!: KeyValue<number, string>[]
  city!: KeyValue<number, string>

  dataSource: Donor[] = [];
  selectedRowIndex: number | null = null; // משתנה לשמירת השורה שנבחרה

  constructor(private _service: DonorsManegementService, public dialog: MatDialog, private filterService: FilterDataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getData()
    this._service.getCities().subscribe(x => {
      this.citiesList = x;
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes["donorId"]) {
      // this.isDonorIdChange = true
      this.openDonor()
      this.donorId = 0
    }
  }

  private openDonor() {
    if (this.donorId) {
      this.expandedElement = this.dataSource.find(x => x.donorId == this.donorId);
      // this.isDonorIdChange = false;

      // this.dataSource = this.dataSource.filter(x => x.donorId == this.donorId)
    }

  }
  getData(filters: DataFilter[] = []) {
    this._service.getDonors(filters).subscribe(x => {
      this.dataSource = x
      if (this.donorId)
        this.openDonor()
    })
    this.filterService.getDataFilters();

  }

  columnsToDisplay = ['donorName', 'donorCity', 'donorAddress', 'shul', 'phone', 'email', 'comments', 'edit', 'delete'];
  namesToDisplay = ['שם תורם', 'עיר', 'כתובת', 'בית כנסת', 'טלפון', 'דוא"ל', 'הערה'];

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: any;


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: Donor, index: number): void {
    this.selectedRowIndex = index; // שמירת האינדקס של השורה שנבחרה
    const dialogRef = this.dialog.open(DonorDaialogComponent, {
      width: '26%',
      height: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: { edit: true, element: element }
    });

    // dialogRef.afterClosed().subscribe(x => {
    //   this.getData()
    // });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // עדכון הנתונים בטבלה
        this.getData()
        // החזרת המיקוד לשורה שנבחרה
        if (this.selectedRowIndex !== null) {
          // כאן תוכל להחזיר את המיקוד לשורה שנבחרה
          // לדוגמה, אם אתה משתמש ב-Material Table:
          const table = document.querySelector('table');
          if (table) {
            const row = table.rows[this.selectedRowIndex + 1]; // +1 אם יש כותרת
            if (row) {
              row.scrollIntoView({ behavior: 'smooth' });
              // או להדגיש את השורה
              row.classList.add('highlight'); // תוסיף סגנון CSS להדגשה
            }
          }
        }
      }
    });
  }

  delete(donorId: number, donorName: string) {
    this._snackBar.open(`?האם אתה בטוח שברצונך למחוק את התורם: ${donorName}`, 'אישור', {
      duration: 5000,
    }).onAction().subscribe(() => {
      this._service.deleteDonor(donorId).subscribe(x => {
        if (x) {
          this.getData()
        }
      });
    })
  }

  refreshDataOnDeletedDonation(event: string) {
    if (event == 'refresh')
      this.getData()
  }
  getCities(city: number) {
    this.citiesList.map(y => {
      if (y.key == city)
        this.city = y
    })
    return this.city ? this.city : null
  }
}
